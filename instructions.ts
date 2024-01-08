/*
 * @britzdylan/adonisjs-flow
 *
 * (c) Dylan Britz <dev.w.dylan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { ScaffoldOptions } from './types'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import {
  makeContracts,
  makeModels,
  makeEnums,
  makeException,
  makeControllers,
  makeEvents,
  makeMiddleware,
  makeMigrations,
  makeProviders,
  makeRoutes,
  makeServiceProviders,
  makeValidators,
  makeResources
} from './scaffold'

async function getStack(sink: typeof sinkStatic) {
  return sink.getPrompt().choice('Which stack would you like to scaffold?', ['edge', 'vue'], {
    default: 'edge',
    validate(choice) {
      return choice && choice.length ? true : 'Which stack would you like to scaffold?'
    },
  })
}

async function askShouldInstallPackage(sink: typeof sinkStatic) {
  return sink.getPrompt().confirm('Would you like to install all required dependencies?')
}

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic
) {
  const options: ScaffoldOptions = {
    stack: 'edge',
  }

  options.stack = await getStack(sink)

  makeControllers(projectRoot, app, sink, options)
  makeEnums(projectRoot, sink, options)
  makeException(projectRoot, app, sink, options)
  makeMiddleware(projectRoot, app, sink, options)
  makeModels(projectRoot, app, sink, options)
  makeServiceProviders(projectRoot, sink, options)
  makeValidators(projectRoot, sink, options)
  makeContracts(projectRoot, app, sink, options)
  makeMigrations(projectRoot, sink, options)
  makeProviders(projectRoot, app, sink, options)
  makeEvents(projectRoot, sink, options)
  makeRoutes(projectRoot, sink, options)
  makeResources(projectRoot, sink, options)

  const shouldInstallPackage = await askShouldInstallPackage(sink)

  if (shouldInstallPackage) {
    /**
     * Install required dependencies
     */
    const pkg = new sink.files.PackageJsonFile(projectRoot)

    pkg.install('tailwindcss', undefined, true)
    pkg.install('autoprefixer', undefined, true)
    pkg.install('postcss', undefined, true)
    pkg.install('postcss-loader', undefined, true)
    pkg.install('ua-parser-js', undefined, false)
    pkg.install('ms', undefined, false)

    if (options.stack === 'edge') {
      pkg.install('daisyui', undefined, true)
    }

    if (options.stack === 'vue') {
      pkg.install('@eidellev/inertia-adonisjs', undefined, false)
      pkg.install('vue', undefined, false)
      pkg.install('vue-loader', undefined, false)
      pkg.install('@inertiajs/vue3', undefined, false)
      pkg.install('@vue/tsconfig', undefined, false)
      pkg.install('markdown-it', undefined, false)
      pkg.install('primeicons', undefined, false)
      pkg.install('primevue', undefined, false)
    }

    const logLines = [
      `Installing: ${sink.logger.colors.gray(pkg.getInstalls().list.join(', '))}`,
    ]

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
}
