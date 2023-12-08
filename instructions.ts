/*
 * @britzdylan/adonisjs-flow
 *
 * (c) Dylan Britz <dev.w.dylan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { join } from 'path'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'

/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths)
}

function makeModels(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const modelsDirectory = app.resolveNamespaceDirectory('models') || 'app/Models'

  /**
   * User model
   */
  const userModelPath = join(modelsDirectory, 'User.ts')
  const userModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    userModelPath,
    getStub('app/models/User.txt')
  )

  userModelTemplate.overwrite = true

  userModelTemplate.commit()
  sink.logger.action('create').succeeded(userModelPath)

  /**
   * UserProfile model
   */
  const userProfileModelPath = join(modelsDirectory, 'UserProfile.ts')
  const userProfileModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    userProfileModelPath,
    getStub('app/models/UserProfile.txt')
  )

  userProfileModelTemplate.overwrite = true

  userProfileModelTemplate.commit()
  sink.logger.action('create').succeeded(userProfileModelPath)

  /**
   * ApiToken model
   */
  const apiTokenModelPath = join(modelsDirectory, 'ApiToken.ts')
  const apiTokenModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    apiTokenModelPath,
    getStub('app/models/ApiToken.txt')
  )

  apiTokenModelTemplate.overwrite = true

  apiTokenModelTemplate.commit()
  sink.logger.action('create').succeeded(apiTokenModelPath)

  /**
   * UserSession model
   */
  const userSessionModelPath = join(modelsDirectory, 'UserSession.ts')
  const userSessionModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    userSessionModelPath,
    getStub('app/models/UserSession.txt')
  )

  userSessionModelTemplate.overwrite = true

  userSessionModelTemplate.commit()
  sink.logger.action('create').succeeded(userSessionModelPath)

  /**
   * PasswordResetToken model
   */
  const passwordResetModelPath = join(modelsDirectory, 'PasswordReset.ts')
  const passwordResetModelTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetModelPath,
    getStub('app/models/PasswordReset.txt')
  )

  if (passwordResetModelTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetModelPath} file already exists`)
  } else {
    passwordResetModelTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetModelPath)
  }
}

function makeControllers(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const controllersAuthDirectory =
    app.resolveNamespaceDirectory('controllers') || 'app/Controllers/Http/Auth'
  const controllersUserDirectory =
    app.resolveNamespaceDirectory('controllers') || 'app/Controllers/Http/User'

  /**
   * Login Controller
   */
  const loginControllerPath = join(controllersAuthDirectory, 'LoginController.ts')
  const loginControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    loginControllerPath,
    getStub('app/controllers/Http/Auth/LoginController.txt')
  )

  loginControllerTemplate.overwrite = true

  loginControllerTemplate.commit()
  sink.logger.action('create').succeeded(loginControllerPath)

  /**
   * PasswordConfirmation Controller
   */
  const passwordConfirmationPath = join(controllersAuthDirectory, 'PasswordConfirmationController.ts')
  const passwordConfirmationTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordConfirmationPath,
    getStub('app/controllers/Http/Auth/PasswordConfirmationController.txt')
  )

  passwordConfirmationTemplate.overwrite = true

  passwordConfirmationTemplate.commit()
  sink.logger.action('create').succeeded(passwordConfirmationPath)

  /**
   * PasswordReset Controller
   */
  const passwordResetPath = join(controllersAuthDirectory, 'PasswordResetController.ts')
  const passwordResetTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetPath,
    getStub('app/controllers/Http/Auth/PasswordResetController.txt')
  )

  passwordResetTemplate.overwrite = true

  passwordResetTemplate.commit()
  sink.logger.action('create').succeeded(passwordResetPath)

  /**
   * PasswordResetRequestController
   */
  const passwordResetControllerPath = join(
    controllersAuthDirectory,
    'PasswordResetRequestController.ts'
  )
  const passwordResetControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordResetControllerPath,
    getStub('app/controllers/Http/Auth/PasswordResetRequestController.txt')
  )

  passwordResetControllerTemplate.overwrite = true

  passwordResetControllerTemplate.commit()
  sink.logger.action('create').succeeded(passwordResetControllerPath)

  /**
   * Register Controller
   */
  const RegisterControllerPath = join(controllersAuthDirectory, 'RegisterController.ts')
  const RegisterControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    RegisterControllerPath,
    getStub('app/controllers/Http/Auth/RegisterController.txt')
  )

  RegisterControllerTemplate.overwrite = true

  RegisterControllerTemplate.commit()
  sink.logger.action('create').succeeded(RegisterControllerPath)

  /**
   * Profiles Controller
   */
  const ProfilesControllerPath = join(controllersUserDirectory, 'ProfilesController.ts')
  const ProfilesControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    ProfilesControllerPath,
    getStub('app/controllers/Http/User/ProfilesController.txt')
  )

  ProfilesControllerTemplate.overwrite = true

  ProfilesControllerTemplate.commit()
  sink.logger.action('create').succeeded(ProfilesControllerPath)

  /**
   * ApiTokens Controller
   */
  const apiTokensControllerPath = join(controllersUserDirectory, 'ApiTokensController.ts')
  const apiTokensControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    apiTokensControllerPath,
    getStub('app/controllers/Http/User/ApiTokensController.txt')
  )

  apiTokensControllerTemplate.overwrite = true

  apiTokensControllerTemplate.commit()
  sink.logger.action('create').succeeded(apiTokensControllerPath)

  /**
   * Users Controller
   */
  const usersControllerPath = join(controllersUserDirectory, 'UsersController.ts')
  const usersControllerTemplate = new sink.files.MustacheFile(
    projectRoot,
    usersControllerPath,
    getStub('app/controllers/Http/User/UsersController.txt')
  )

  usersControllerTemplate.overwrite = true

  usersControllerTemplate.commit()
  sink.logger.action('create').succeeded(usersControllerPath)
}

function makeEnums(projectRoot: string, sink: typeof sinkStatic) {
  const enumsDirectory = 'app/Enums'

  /**
   * FlashMessage enum
   */
  const FlashMessagePath = join(enumsDirectory, 'FlashMessage.ts')
  const FlashMessageTemplate = new sink.files.MustacheFile(
    projectRoot,
    FlashMessagePath,
    getStub('app/Enums/FlashMessage.txt')
  )

  FlashMessageTemplate.overwrite = true

  FlashMessageTemplate.commit()
  sink.logger.action('create').succeeded(FlashMessagePath)

  /**
   * HttpStatusCodes enum
   */
  const httpStatusCodesPath = join(enumsDirectory, 'HttpStatusCodes.ts')
  const httpStatusCodesTemplate = new sink.files.MustacheFile(
    projectRoot,
    httpStatusCodesPath,
    getStub('app/Enums/HttpStatusCodes.txt')
  )

  httpStatusCodesTemplate.overwrite = true

  httpStatusCodesTemplate.commit()
  sink.logger.action('create').succeeded(httpStatusCodesPath)

  /**
   * MailerPresets enum
   */
  const mailerPresetsPath = join(enumsDirectory, 'MailerPresets.ts')
  const mailerPresetsTemplate = new sink.files.MustacheFile(
    projectRoot,
    mailerPresetsPath,
    getStub('app/Enums/MailerPresets.txt')
  )

  mailerPresetsTemplate.overwrite = true

  mailerPresetsTemplate.commit()
  sink.logger.action('create').succeeded(mailerPresetsPath)
}

function makeException(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const exceptionsPath = app.resolveNamespaceDirectory('exceptions') || 'app/Exceptions'

  /**
   * Handler enum
   */
  const handlerPath = join(exceptionsPath, 'Handler.ts')
  const handlerTemplate = new sink.files.MustacheFile(
    projectRoot,
    handlerPath,
    getStub('app/Exceptions/Handler.txt')
  )

  handlerTemplate.overwrite = true

  handlerTemplate.commit()
  sink.logger.action('create').succeeded(handlerPath)
}

function makeMiddleware(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const middlewarePath = app.resolveNamespaceDirectory('middleware') || 'app/Middleware'

  /**
   * ConfirmPassword middleware
   */
  const confirmPasswordPath = join(middlewarePath, 'ConfirmPassword.ts')
  const confirmPasswordTemplate = new sink.files.MustacheFile(
    projectRoot,
    confirmPasswordPath,
    getStub('app/Middleware/ConfirmPassword.txt')
  )

  confirmPasswordTemplate.overwrite = true

  confirmPasswordTemplate.commit()
  sink.logger.action('create').succeeded(confirmPasswordPath)

  /**
   * Guest middleware
   */
  const guestPath = join(middlewarePath, 'Guest.ts')
  const guestTemplate = new sink.files.MustacheFile(
    projectRoot,
    guestPath,
    getStub('app/Middleware/Guest.txt')
  )

  guestTemplate.overwrite = true

  guestTemplate.commit()
  sink.logger.action('create').succeeded(guestPath)

  /**
   * ShareProfile middleware
   */
  const shareProfilePath = join(middlewarePath, 'ShareProfile.ts')
  const shareProfileTemplate = new sink.files.MustacheFile(
    projectRoot,
    shareProfilePath,
    getStub('app/Middleware/ShareProfile.txt')
  )

  shareProfileTemplate.overwrite = true

  shareProfileTemplate.commit()
  sink.logger.action('create').succeeded(shareProfilePath)

  /**
   * VerificationCheck middleware
   */
  const verificationCheckPath = join(middlewarePath, 'VerificationCheck.ts')
  const verificationCheckTemplate = new sink.files.MustacheFile(
    projectRoot,
    verificationCheckPath,
    getStub('app/Middleware/VerificationCheck.txt')
  )

  verificationCheckTemplate.overwrite = true

  verificationCheckTemplate.commit()
  sink.logger.action('create').succeeded(verificationCheckPath)
}

function makeServiceProviders(projectRoot: string, sink: typeof sinkStatic) {
  const providerPath = 'app/Providers'

  /**
   * EmailSendingProvider middleware
   */
  const emailSendingPath = join(providerPath, 'EmailSendingProvider.ts')
  const emailSendingTemplate = new sink.files.MustacheFile(
    projectRoot,
    emailSendingPath,
    getStub('app/Providers/EmailSendingProvider.txt')
  )

  emailSendingTemplate.overwrite = true

  emailSendingTemplate.commit()
  sink.logger.action('create').succeeded(emailSendingPath)

  /**
   * ValidationRulesProvider middleware
   */
  const validationRulesPath = join(providerPath, 'ValidationRulesProvider.ts')
  const validationRulesTemplate = new sink.files.MustacheFile(
    projectRoot,
    validationRulesPath,
    getStub('app/Providers/ValidationRulesProvider.txt')
  )

  validationRulesTemplate.overwrite = true

  validationRulesTemplate.commit()
  sink.logger.action('create').succeeded(validationRulesPath)
}

function makeValidators(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {
  const validatorsPath = app.resolveNamespaceDirectory('validators') || 'app/Validators'

  /**
   * RegisterValidator
   */
  const registerPath = join(validatorsPath, 'RegisterValidator.ts')
  const registerTemplate = new sink.files.MustacheFile(
    projectRoot,
    registerPath,
    getStub('app/Validators/Auth/RegisterValidator.txt')
  )

  registerTemplate.overwrite = true

  registerTemplate.commit()
  sink.logger.action('create').succeeded(registerPath)

  /**
   * PasswordUpdateValidator
   */
  const passwordUpdatePath = join(validatorsPath, 'PasswordUpdateValidator.ts')
  const passwordUpdateTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordUpdatePath,
    getStub('app/Validators/User/PasswordUpdateValidator.txt')
  )

  passwordUpdateTemplate.overwrite = true

  passwordUpdateTemplate.commit()
  sink.logger.action('create').succeeded(passwordUpdatePath)

  /**
   * PasswordValidator
   */
  const passwordPath = join(validatorsPath, 'PasswordValidator.ts')
  const passwordTemplate = new sink.files.MustacheFile(
    projectRoot,
    passwordPath,
    getStub('app/Validators/User/PasswordValidator.txt')
  )

  passwordTemplate.overwrite = true

  passwordTemplate.commit()
  sink.logger.action('create').succeeded(passwordPath)

  /**
   * ProfileValidator
   */
  const profilePath = join(validatorsPath, 'ProfileValidator.ts')
  const profileTemplate = new sink.files.MustacheFile(
    projectRoot,
    profilePath,
    getStub('app/Validators/User/ProfileValidator.txt')
  )

  profileTemplate.overwrite = true

  profileTemplate.commit()
  sink.logger.action('create').succeeded(profilePath)
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  makeControllers(projectRoot, app, sink)
  makeEnums(projectRoot, sink)
  makeException(projectRoot, app, sink)
  makeMiddleware(projectRoot, app, sink)
  makeModels(projectRoot, app, sink)
  makeServiceProviders(projectRoot, sink)
  makeValidators(projectRoot, app, sink)
  // makeCustomErrorPages(projectRoot, sink)

  /**
   * Install required dependencies
   */
  const pkg = new sink.files.PackageJsonFile(projectRoot)

  pkg.install('tailwindcss', undefined, true)
  pkg.install('daisyui', undefined, true)
  pkg.install('autoprefixer', undefined, true)
  pkg.install('postcss', undefined, true)
  pkg.install('postcss-loader', undefined, true)
  pkg.install('ua-parser-js', undefined, false)

  const logLines = [`Installing: ${sink.logger.colors.gray(pkg.getInstalls(true).list.join(', '))}`]

  const spinner = sink.logger.await(logLines.join(' '))

  try {
    await pkg.commitAsync()
    spinner.update('Packages installed')
  } catch (error) {
    spinner.update('Unable to install packages')
    sink.logger.fatal(error)
  }

  spinner.stop()
}
