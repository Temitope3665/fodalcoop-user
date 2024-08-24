export const LOGIN_URL: string = '/';
export const RESET_PASSWORD_URL: string = '/reset-password';
export const CREATE_NEW_PASSWORD_URL: string = '/set-new-password';
export const CREATE_ACCOUNT_URL: string = '/create-account';
export const VERIFY_OTP: string = '/verify';

// Onboarding
export const ONBOARDING_STEP_ONE_URL: string = '/onboarding/step-one';
export const ONBOARDING_STEP_TWO_URL: string = '/onboarding/step-two';
export const ONBOARDING_STEP_THREE_URL: string = '/onboarding/step-three';
export const ONBOARDING_STEP_FOUR_URL: string = '/onboarding/step-four';
export const ONBOARDING_REVIEW_URL: string = '/onboarding/review';

// Dashboard
export const DASHBOARD_HOME_URL: string = '/dashboard';
export const LOANS_URL: string = '/loans';
export const SAVINGS_URL: string = '/savings';
export const MARKET_URL: string = '/market-place';
export const GUARANTOR_URL: string = '/guarantors';
export const VOTING_URL: string = '/voting';

// Carts
export const CARTS_URL: string = '/market-place/carts';

// Settings
export const SETTINGS_URL: string = '/settings';

// Supports
export const SUPPORT_URL: string = '/support';

export const protectedRoutes: string[] = [
  DASHBOARD_HOME_URL,
  LOANS_URL,
  SAVINGS_URL,
  MARKET_URL,
  GUARANTOR_URL,
  VOTING_URL,
  CARTS_URL,
  SETTINGS_URL,
  SUPPORT_URL,
];

export const authRoutes: string[] = [
  LOGIN_URL,
  RESET_PASSWORD_URL,
  CREATE_NEW_PASSWORD_URL,
  CREATE_ACCOUNT_URL,
  VERIFY_OTP,
  ONBOARDING_STEP_ONE_URL,
  ONBOARDING_STEP_TWO_URL,
  ONBOARDING_STEP_THREE_URL,
  ONBOARDING_STEP_FOUR_URL,
  ONBOARDING_REVIEW_URL,
];
