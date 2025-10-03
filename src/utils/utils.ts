import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FUNCTION TO FORMAT DATE
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};

// Short Date Format
export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short", 
    day: "numeric", 
  };
  return date.toLocaleDateString("en-US", options);
};

// Truncating of a String
export const truncateString = (str: string, num: number) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + "...";
};

