const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9._-]{3,30}$/;

// each function returns an error message, or an empty string when the value is valid.

export function validateUsername(value: string): string {
  const trimmed = value.trim();

  if (!trimmed) return 'Username or email is required';

  // if it looks like an email,check the email format
  if (trimmed.includes('@')) {
    return EMAIL_REGEX.test(trimmed) ? '' : 'Enter a valid email address';
  }

  return USERNAME_REGEX.test(trimmed)
    ? ''
    : 'Username must be 3-30 characters (letters, numbers, . _ -)';
}

export function validatePassword(value: string): string {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  return '';
}