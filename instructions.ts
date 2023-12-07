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
    getStub('templates/app/models/User.txt')
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
    userModelPath,
    getStub('templates/app/models/UserProfile.txt')
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
    userModelPath,
    getStub('templates/app/models/ApiToken.txt')
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
    userModelPath,
    getStub('templates/app/models/UserSession.txt')
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
    getStub('templates/app/models/PasswordReset.txt')
  )

  if (passwordResetModelTemplate.exists()) {
    sink.logger.action('create').skipped(`${passwordResetModelPath} file already exists`)
  } else {
    passwordResetModelTemplate.commit()
    sink.logger.action('create').succeeded(passwordResetModelPath)
  }
}

// function makeMigrations(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeControllers(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeValidators(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeViews(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeRoutes(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeTests(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeMiddleware(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

// function makeEventsContract(
//   projectRoot: string,
//   app: ApplicationContract,
//   sink: typeof sinkStatic
// ) {}

// function makeEnums(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  makeModels(projectRoot, app, sink)
  // makeMigrations(projectRoot, app, sink)
  // makeControllers(projectRoot, app, sink)
  // makeValidators(projectRoot, app, sink)
  // makeMiddleware(projectRoot, app, sink)
  // makeEnums(projectRoot, app, sink)
  // makeAppProviders(projectRoot, app, sink)
  // makeConfig(projectRoot, app, sink)
  // makeProviders(projectRoot, app, sink)
  // makeEventsContract(projectRoot, app, sink)
  // makeEvents(projectRoot, app, sink)
  // makeRoutes(projectRoot, app, sink)
  // makeResources(projectRoot, app, sink)
  // makeTests(projectRoot, app, sink)
  // makeRootFiles(projectRoot, app, sink)

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
