"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MapPin, Phone, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Form validation schema
const addressSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  street: z.string().min(5, "Street address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(4, "ZIP code must be at least 4 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

// Types
export type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
  initialData: AddressFormValues;
  onSubmit: (data: AddressFormValues) => void;
}

// Cities with suggestions for autocomplete demo
const INDIAN_CITIES = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
];

// States with suggestions for autocomplete demo
const INDIAN_STATES = [
  "Maharashtra",
  "Delhi",
  "Karnataka",
  "Telangana",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "Bihar",
  "Andhra Pradesh",
  "Haryana",
  "Kerala",
  "Punjab",
  "Odisha",
  "Assam",
  "Jharkhand",
];

export default function AddressForm({
  initialData,
  onSubmit,
}: AddressFormProps) {
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  // Filter city suggestions based on input
  const handleCityInputChange = (value: string) => {
    form.setValue("city", value);
    if (value.length > 1) {
      const filteredSuggestions = INDIAN_CITIES.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setCitySuggestions(filteredSuggestions);
      setShowCitySuggestions(filteredSuggestions.length > 0);
    } else {
      setCitySuggestions([]);
      setShowCitySuggestions(false);
    }
  };

  // Filter state suggestions based on input
  const handleStateInputChange = (value: string) => {
    form.setValue("state", value);
    if (value.length > 1) {
      const filteredSuggestions = INDIAN_STATES.filter((state) =>
        state.toLowerCase().includes(value.toLowerCase())
      );
      setStateSuggestions(filteredSuggestions);
      setShowStateSuggestions(filteredSuggestions.length > 0);
    } else {
      setStateSuggestions([]);
      setShowStateSuggestions(false);
    }
  };

  // Handle city suggestion selection
  const handleSelectCity = (city: string) => {
    form.setValue("city", city);
    setShowCitySuggestions(false);
  };

  // Handle state suggestion selection
  const handleSelectState = (state: string) => {
    form.setValue("state", state);
    setShowStateSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCitySuggestions(false);
      setShowStateSuggestions(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        {...field}
                        placeholder="+91 9876543210"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      placeholder="123 Main Street, Apartment 4B"
                      className="pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCityInputChange(e.target.value);
                        }}
                        onFocus={() => handleCityInputChange(field.value)}
                        placeholder="Mumbai"
                      />
                    </FormControl>
                    <FormMessage />

                    {/* City suggestions */}
                    {showCitySuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {citySuggestions.map((city, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectCity(city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e);
                          handleStateInputChange(e.target.value);
                        }}
                        onFocus={() => handleStateInputChange(field.value)}
                        placeholder="Maharashtra"
                      />
                    </FormControl>
                    <FormMessage />

                    {/* State suggestions */}
                    {showStateSuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {stateSuggestions.map((state, index) => (
                          <div
                            key={index}
                            className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectState(state)}
                          >
                            {state}
                          </div>
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP / Postal Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="400001" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="India" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full md:w-auto">
              Continue to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
