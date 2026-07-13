import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTimeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "year" : "years"} ago`;
};

export const getTimeAgoShort = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "m" : "m"}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} ${hours === 1 ? "h" : "h"}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `${days} ${days === 1 ? "d" : "d"}`;
  }

  const weeks = Math.floor(days / 7);
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? "w" : "w"}`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} ${months === 1 ? "mo" : "mon"}`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? "y" : "y"}`;
};
