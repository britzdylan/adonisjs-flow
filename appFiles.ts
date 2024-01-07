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

const emails = [
  'emails/confirmation_template/index',
  'emails/confirmation_template/plain',
  'emails/verify_template/index',
  'emails/verify_template/plain',
  'emails/welcome/index',
  'emails/welcome/plain',
]

const errors = ['errors/not-found', 'errors/server-error', 'errors/unauthorized']

const partials = ['partials/meta']

export const sharedViews = [...emails, ...errors, ...partials]

export const sharedJs = ['app']

export const sharedCss = ['app']

export const themeFiles = [
  'theme/avatar/index',
  'theme/button/index',
  'theme/card/index',
  'theme/checkbox/index',
  'theme/dialog/index',
  'theme/inputText/index',
  'theme/menu/index',
  'theme/menuBar/index',
  'theme/overlayPanel/index',
  'theme/toast/index',
  'theme/global',
  'theme/index',
]

export const vueFiles = [
  'src/Pages/Error',
  'src/Pages/Login',
  'src/Pages/Password-reset',
  'src/Pages/Password-update',
  'src/Pages/Register',
  'src/Pages/Verification',
  'src/Pages/Dashboard/Index',
  'src/Pages/Dashboard/Profile',
  'src/Layouts/Auth',
  'src/Layouts/Default',
  'src/Components/Composites/EmailVerificationForm',
  'src/Components/Composites/FlashMessages',
  'src/Components/Composites/Navbar',
  'src/Components/Composites/ProfileApiTokens',
  'src/Components/Composites/ProfileAvatarForm',
  'src/Components/Composites/ProfileDeleteForm',
  'src/Components/Composites/ProfileSessionsForm',
  'src/Components/Composites/ProfileDetailsForm',
  'src/Components/Composites/ProfilePasswordForm',
  'src/Components/Overlays/Terms',
  'src/Components/UI/FormInput',
  'src/Components/UI/Logo',
  'src/Components/UI/PageHeader',
  'src/Components/UI/ProfileMenu',
  'src/Components/UI/UserAvatar',
]
