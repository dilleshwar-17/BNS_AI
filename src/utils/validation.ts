/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Validation utility functions for BNS AI application
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

/**
 * Validates a legal query
 * @param query - The legal query to validate
 * @returns Validation result with error message if invalid
 */
export const validateLegalQuery = (query: string): ValidationResult => {
  if (!query) {
    return { valid: false, error: 'Query cannot be empty' };
  }

  const trimmedQuery = query.trim();

  if (trimmedQuery.length === 0) {
    return { valid: false, error: 'Query cannot contain only whitespace' };
  }

  if (trimmedQuery.length < 3) {
    return { valid: false, error: 'Query must be at least 3 characters long' };
  }

  if (trimmedQuery.length > 5000) {
    return { valid: false, error: 'Query exceeds maximum length of 5000 characters' };
  }

  // Check for potentially malicious patterns
  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers
    /eval\(/i,
  ];

  for (const pattern of maliciousPatterns) {
    if (pattern.test(trimmedQuery)) {
      return { valid: false, error: 'Query contains invalid characters or patterns' };
    }
  }

  return { valid: true, sanitized: trimmedQuery };
};

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns Validation result
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { valid: false, error: 'Email cannot be empty' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  if (email.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }

  return { valid: true, sanitized: email.toLowerCase().trim() };
};

/**
 * Validates a password
 * @param password - The password to validate
 * @returns Validation result
 */
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { valid: false, error: 'Password cannot be empty' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }

  if (password.length > 128) {
    return { valid: false, error: 'Password is too long' };
  }

  // Check for at least one uppercase letter, one lowercase letter, and one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumber) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, and numeric characters',
    };
  }

  return { valid: true };
};

/**
 * Validates a username
 * @param username - The username to validate
 * @returns Validation result
 */
export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { valid: false, error: 'Username cannot be empty' };
  }

  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters long' };
  }

  if (trimmedUsername.length > 50) {
    return { valid: false, error: 'Username must be at most 50 characters long' };
  }

  // Allow alphanumeric, underscore, and hyphen
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;

  if (!usernameRegex.test(trimmedUsername)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, underscores, and hyphens',
    };
  }

  return { valid: true, sanitized: trimmedUsername };
};

/**
 * Sanitizes a string to prevent XSS attacks
 * @param input - The input string to sanitize
 * @returns Sanitized string
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validates a legal document title
 * @param title - The document title to validate
 * @returns Validation result
 */
export const validateDocumentTitle = (title: string): ValidationResult => {
  if (!title) {
    return { valid: false, error: 'Title cannot be empty' };
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length < 3) {
    return { valid: false, error: 'Title must be at least 3 characters long' };
  }

  if (trimmedTitle.length > 200) {
    return { valid: false, error: 'Title must be at most 200 characters long' };
  }

  return { valid: true, sanitized: trimmedTitle };
};

/**
 * Validates a section number (e.g., "103", "318(2)")
 * @param section - The section number to validate
 * @returns Validation result
 */
export const validateSectionNumber = (section: string): ValidationResult => {
  if (!section) {
    return { valid: false, error: 'Section number cannot be empty' };
  }

  const sectionRegex = /^\d+(\(\d+\))?$/;

  if (!sectionRegex.test(section.trim())) {
    return { valid: false, error: 'Invalid section number format' };
  }

  return { valid: true, sanitized: section.trim() };
};

/**
 * Validates a voice input transcript
 * @param transcript - The voice transcript to validate
 * @returns Validation result
 */
export const validateVoiceTranscript = (transcript: string): ValidationResult => {
  if (!transcript) {
    return { valid: false, error: 'Transcript cannot be empty' };
  }

  const trimmedTranscript = transcript.trim();

  if (trimmedTranscript.length < 2) {
    return { valid: false, error: 'Transcript too short' };
  }

  if (trimmedTranscript.length > 10000) {
    return { valid: false, error: 'Transcript exceeds maximum length' };
  }

  return { valid: true, sanitized: trimmedTranscript };
};

/**
 * Validates all fields for user registration
 * @param data - Registration data
 * @returns Validation result
 */
export const validateRegistration = (data: {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}): ValidationResult => {
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    return emailValidation;
  }

  // Validate password
  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.valid) {
    return passwordValidation;
  }

  // Validate password confirmation
  if (data.password !== data.confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }

  // Validate name
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters long' };
  }

  if (data.name.length > 100) {
    return { valid: false, error: 'Name is too long' };
  }

  return { valid: true };
};

/**
 * Validates all fields for user login
 * @param data - Login data
 * @returns Validation result
 */
export const validateLogin = (data: {
  email: string;
  password: string;
}): ValidationResult => {
  // Validate email
  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    return emailValidation;
  }

  // Validate password is not empty
  if (!data.password) {
    return { valid: false, error: 'Password cannot be empty' };
  }

  return { valid: true };
};
