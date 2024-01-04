export const models = ['ApiToken', 'PasswordReset', 'User', 'UserProfile', 'UserSession']
export const authControllers = [
  'LoginController',
  'PasswordResetController',
  'RegisterController',
  'PasswordResetRequestController',
  'PasswordResetController',
]
export const userControllers = ['ApiTokensController', 'ProfilesController', 'UsersController']
export const enums = ['FlashMessage', 'HttpStatusCodes', 'MailerPresets']
export const exceptions = ['Handler']
export const middleware = ['ConfirmPassword', 'Guest', 'ShareProfile', 'VerificationCheck']
export const services = ['EmailSendingProvider', 'ValidationRulesProvider']
export const authValidators = ['RegisterValidator']
export const userValidators = ['PasswordUpdateValidator', 'PasswordValidator', 'ProfileValidator']
// export const config  = ['flow']
export const contracts = ['events']
export const migrations = [
  '1697024229003_users',
  '1697025049030_password_resets',
  '1697025542544_user_sessions',
  '1697027522393_api_tokens',
  '1697733327219_user_profiles',
]
export const providers = ['AppProvider', 'SessionDriver/index']
export const events = ['auth', 'index']
export const routes = ['api-tokens', 'auth', 'errors', 'profile']
