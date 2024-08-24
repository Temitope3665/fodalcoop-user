import { IDefaultUser } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

// table range
export const range = (start: number, end: number) => {
  let length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export function formatStringWithCommas(numberString: string) {
  const number = parseFloat(numberString);
  if (isNaN(number)) {
    console.error('Invalid number string');
  }
  return number.toLocaleString();
}

export const capitalizeFirstLetter = (str: string) => {
  const capitalized = str && str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export function checkKeysAndValues(obj: any, requiredKeys: any) {
  // Check if every key in the object is one of the required keys
  const hasAllRequiredKeys = Object.keys(obj).every((key) =>
    requiredKeys.includes(key)
  );

  // Check if each required key has a value in the object
  const allRequiredKeysHaveValue = requiredKeys.every(
    (key: any) => obj[key] !== undefined && obj[key] !== null && obj[key] !== ''
  );

  return hasAllRequiredKeys && allRequiredKeysHaveValue;
}

export function converBase64ToFile(base64: string) {
  if (!base64) return null;

  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mimeString });
  return new File([blob], 'image', { type: mimeString });
}
