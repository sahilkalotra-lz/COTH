/**
 * Generate a random 4-digit OTP
 * @returns {string} 4-digit OTP string
 */
export const generateOTP = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

/**
 * Generate a random 6-digit OTP
 * @returns {string} 6-digit OTP string
 */
export const generateOTP6Digit = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
