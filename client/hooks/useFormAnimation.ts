"use client";

import { useState, useCallback } from "react";

interface FormAnimationReturn {
  formState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  setSuccess: (message?: string) => void;
  setError: (message: string) => void;
  reset: () => void;
}

/**
 * Custom hook for handling form animation states
 */
export const useFormAnimation = (): FormAnimationReturn => {
  const [formState, setFormState] = useState<{
    isSuccess: boolean;
    isError: boolean;
    message: string;
  }>({
    isSuccess: false,
    isError: false,
    message: "",
  });

  const setSuccess = useCallback((message = "Success!"): void => {
    setFormState({
      isSuccess: true,
      isError: false,
      message,
    });

    // Auto-reset success state after 3 seconds
    setTimeout(() => {
      setFormState((prev) => ({
        ...prev,
        isSuccess: false,
        message: "",
      }));
    }, 3000);
  }, []);

  const setError = useCallback((message: string): void => {
    setFormState({
      isSuccess: false,
      isError: true,
      message,
    });
  }, []);

  const reset = useCallback((): void => {
    setFormState({
      isSuccess: false,
      isError: false,
      message: "",
    });
  }, []);

  return {
    formState,
    setSuccess,
    setError,
    reset,
  };
};

export default useFormAnimation;
