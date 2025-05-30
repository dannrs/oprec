import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Profile, profileSchema } from './validations';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isProfileComplete(profile: Profile | null): boolean {
  if (!profile) return false;
  return profileSchema.safeParse(profile).success;
}
