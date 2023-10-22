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

function makeModels(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeMigrations(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeControllers(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeValidators(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeViews(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeRoutes(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeTests(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeMiddleware(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

function makeEventsContract(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {}

function makeEnums(projectRoot: string, app: ApplicationContract, sink: typeof sinkStatic) {}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  makeModels(projectRoot, app, sink)
  makeMigrations(projectRoot, app, sink)
  makeControllers(projectRoot, app, sink)
  makeValidators(projectRoot, app, sink)
  makeViews(projectRoot, app, sink)
  makeRoutes(projectRoot, app, sink)
  makeTests(projectRoot, app, sink)
  makeMiddleware(projectRoot, app, sink)
  makeEventsContract(projectRoot, app, sink)
  makeEnums(projectRoot, app, sink)

  //   const options = await sink.getPrompt().multiple('Select the features you want to install', [
  //     {
  //       name: 'tailwindcss',
  //       message: 'Tailwind CSS',
  //     },
  //   ])

  /**
   * Install required dependencies
   */
  const pkg = new sink.files.PackageJsonFile(projectRoot)

  pkg.install('tailwindcss', undefined, true)

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
