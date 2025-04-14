import { useState, useEffect, useCallback, useRef } from "react";

export interface UseNavigationOptions {
  scrollThreshold?: number;
  mobileBreakpoint?: number;
}

export default function useNavigation(options: UseNavigationOptions = {}) {
  const { scrollThreshold = 10, mobileBreakpoint = 1024 } = options;

  // State for scroll and viewport
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Refs
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [mobileBreakpoint]);

  // Handle scroll events with optimized performance
  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events
      if (Math.abs(window.scrollY - lastScrollY.current) < 5) return;

      if (window.scrollY > scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  // Close menu when clicked outside
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Prevent scrolling when menu is open on mobile
    if (isMobile) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, isMobile]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setActiveSubmenu(null);
  }, []);

  // Toggle submenu
  const toggleSubmenu = useCallback((submenu: string) => {
    setActiveSubmenu((prev) => (prev === submenu ? null : submenu));
  }, []);

  // Toggle search with responsive behavior
  const toggleSearch = useCallback(() => {
    if (isMobile) {
      setIsSearchOpen((prev) => !prev);
    } else {
      setIsSearchExpanded((prev) => !prev);
      if (!isSearchExpanded) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 300);
      }
    }
  }, [isMobile, isSearchExpanded]);

  // Handle search submission
  const handleSearch = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();

      if (searchQuery.trim()) {
        console.log("Searching for:", searchQuery);
        // Redirect to search results page (implementation dependent on routing)
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }

      setIsSearchOpen(false);
      setIsSearchExpanded(false);
      setSearchQuery("");
    },
    [searchQuery]
  );

  return {
    // State
    isScrolled,
    isMobile,
    isMenuOpen,
    activeSubmenu,
    isSearchOpen,
    isSearchExpanded,
    searchQuery,

    // Refs
    headerRef,
    searchInputRef,

    // State setters
    setIsMenuOpen,
    setActiveSubmenu,
    setIsSearchOpen,
    setIsSearchExpanded,
    setSearchQuery,

    // Actions
    toggleMenu,
    toggleSubmenu,
    toggleSearch,
    handleSearch,
  };
}
