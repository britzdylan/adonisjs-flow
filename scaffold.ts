import { join } from 'path'
import * as sinkStatic from '@adonisjs/sink'
import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import {
  models,
  authControllers,
  userControllers,
  enums,
  exceptions,
  middleware,
  services,
  authValidators,
  userValidators,
  contracts,
  migrations,
  providers,
  events,
  routes,
  sharedViews,
  sharedJs,
  sharedCss,
  themeFiles,
  vueFiles,
} from './appFiles'
import { ScaffoldOptions } from './types'

function getStub(options: ScaffoldOptions, ...relativePaths: string[]) {
  return join(__dirname, `templates/${options.stack}`, ...relativePaths)
}

export function makeModels(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const modelsDirectory = app.resolveNamespaceDirectory('models') || 'app/Models'

  models.forEach((model) => {
    const modelPath = join(modelsDirectory, `${model}.ts`)
    const modelTemplate = new sink.files.MustacheFile(
      projectRoot,
      modelPath,
      getStub(options, `app/models/${model}.txt`)
    )

    modelTemplate.overwrite = true

    modelTemplate.commit()
    sink.logger.action('create').succeeded(modelPath)
  })
}

export function makeControllers(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const authNameSpace = 'app/Controllers/Http/Auth'
  const userNamespace = 'app/Controllers/Http/User'

  const controllersAuthDirectory = app.resolveNamespaceDirectory('controllers') || authNameSpace
  const controllersUserDirectory = app.resolveNamespaceDirectory('controllers') || userNamespace

  authControllers.forEach((controller) => {
    const controllerPath = join(controllersAuthDirectory, `${controller}.ts`)
    const controllerTemplate = new sink.files.MustacheFile(
      projectRoot,
      controllerPath,
      getStub(options, `${authNameSpace}/${controller}.txt`)
    )
    controllerTemplate.overwrite = true

    controllerTemplate.commit()
    sink.logger.action('create').succeeded(controllerPath)
  })

  userControllers.forEach((controller) => {
    const controllerPath = join(controllersUserDirectory, `${controller}.ts`)
    const controllerTemplate = new sink.files.MustacheFile(
      projectRoot,
      controllerPath,
      getStub(options, `${userNamespace}/${controller}.txt`)
    )
    controllerTemplate.overwrite = true

    controllerTemplate.commit()
    sink.logger.action('create').succeeded(controllerPath)
  })
}

export function makeEnums(projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) {
  const enumsDirectory = 'app/Enums'

  enums.forEach((enumName) => {
    const enumPath = join(enumsDirectory, `${enumName}.ts`)
    const enumTemplate = new sink.files.MustacheFile(
      projectRoot,
      enumPath,
      getStub(options, `${enumsDirectory}/${enumName}.txt`)
    )

    enumTemplate.overwrite = true

    enumTemplate.commit()
    sink.logger.action('create').succeeded(enumPath)
  })
}

export function makeException(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const exceptionsNameSpace = 'app/Exceptions'
  const exceptionsPath = app.resolveNamespaceDirectory('exceptions') || exceptionsNameSpace

  exceptions.forEach((exception) => {
    const exceptionPath = join(exceptionsPath, `${exception}.ts`)
    const exceptionTemplate = new sink.files.MustacheFile(
      projectRoot,
      exceptionPath,
      getStub(options, `${exceptionsNameSpace}/${exception}.txt`)
    )

    exceptionTemplate.overwrite = true

    exceptionTemplate.commit()
    sink.logger.action('create').succeeded(exceptionPath)
  })
}

export function makeMiddleware(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const middlewareNameSpace = 'app/Middleware'
  const middlewarePath = app.resolveNamespaceDirectory('middleware') || middlewareNameSpace

  middleware.forEach((middleware) => {
    if (options.stack === 'vue' && middleware === 'ShareProfile') return
    const path = join(middlewarePath, `${middleware}.ts`)
    const middlewareTemplate = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${middlewareNameSpace}/${middleware}.txt`)
    )

    middlewareTemplate.overwrite = true

    middlewareTemplate.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeServiceProviders(
  projectRoot: string,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const providerPath = 'app/Providers'

  services.forEach((service) => {
    const path = join(providerPath, `${service}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${providerPath}/${service}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeValidators(
  projectRoot: string,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const authNameSpace = 'app/Validators/Auth'
  const userNamespace = 'app/Validators/User'

  authValidators.forEach((validator) => {
    const path = join(authNameSpace, `${validator}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${authNameSpace}/${validator}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })

  userValidators.forEach((validator) => {
    const path = join(userNamespace, `${validator}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${userNamespace}/${validator}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeContracts(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const contractsNameSpace = 'contracts'
  const middlewarePath = app.resolveNamespaceDirectory('contracts') || contractsNameSpace
  contracts.forEach((contract) => {
    const path = join(middlewarePath, `${contract}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${middlewarePath}/${contract}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeMigrations(
  projectRoot: string,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const migrationsNameSpace = 'database/migrations'
  const migrationsPath = migrationsNameSpace
  migrations.forEach((migration) => {
    const path = join(migrationsPath, `${migration}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${migrationsNameSpace}/${migration}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeProviders(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  const providersNameSpace = 'providers'
  const providersPath = app.resolveNamespaceDirectory('providers') || providersNameSpace

  providers.forEach((provider) => {
    const path = join(providersPath, `${provider}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${providersNameSpace}/${provider}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeEvents(projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) {
  const eventsNameSpace = 'start/events'
  const eventsPath = eventsNameSpace

  events.forEach((event) => {
    const path = join(eventsPath, `${event}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${eventsNameSpace}/${event}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeRoutes(projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) {
  const routesNameSpace = 'start/routes'
  const routesPath = routesNameSpace

  routes.forEach((route) => {
    const path = join(routesPath, `${route}.ts`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${routesNameSpace}/${route}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

const getAllViews = (options: ScaffoldOptions) => {
  const partials = [
    'partials/head',
    'partials/header',
    'partials/flashMessages',
    'partials/profile/avatar',
    'partials/profile/delete',
    'partials/profile/details',
    'partials/profile/password',
    'partials/profile/sessions',
    'partials/api-tokens/create-token',
    'partials/api-tokens/list-tokens',
  ]

  const layouts = ['layouts/auth', 'layouts/main']

  const dashboard = ['dashboard/index', 'dashboard/api-tokens', 'dashboard/profile/edit']

  const components = [
    'components/ui/dropdown',
    'components/ui/logo',
    'components/ui/navbar',
    'components/composites/breadcrumbs',
    'components/composites/profileNavigation',
  ]

  const auth = [
    'auth/login',
    'auth/register',
    'auth/verification',
    'auth/confirm-password',
    'auth/password-reset',
    'auth/password-reset-request',
    'auth/password-reset-expired',
    'auth/password-reset-invalid',
  ]

  if (options.stack === 'edge') {
    return [...partials, ...layouts, ...dashboard, ...components, ...auth, ...sharedViews]
  }

  return [...sharedViews]
}

const getAllCSS = (options: ScaffoldOptions) => {
  if (options.stack === 'vue') {
    return [...sharedCss]
  }

  return [...sharedCss]
}

const getAllJs = (options: ScaffoldOptions) => {
  if (options.stack === 'vue') {
    return ['app', ...sharedJs, ...themeFiles]
  }

  return [...sharedJs]
}

const makeViews = (projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) => {
  const viewsNameSpace = 'resources/views'
  const viewsPath = viewsNameSpace

  getAllViews(options).forEach((view) => {
    const path = join(viewsPath, `${view}.edge`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${viewsNameSpace}/${view}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

const makeCss = (projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) => {
  const cssNameSpace = 'resources/css'
  const cssPath = cssNameSpace

  getAllCSS(options).forEach((css) => {
    const path = join(cssPath, `${css}.css`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${cssNameSpace}/${css}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

const makeJs = (projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) => {
  const jsNameSpace = 'resources/js'
  const jsPath = jsNameSpace

  getAllJs(options).forEach((js) => {
    const path = join(jsPath, `${js}.js`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${jsNameSpace}/${js}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

const makeVueFiles = (projectRoot: string, sink: typeof sinkStatic, options: ScaffoldOptions) => {
  const vueNameSpace = 'resources/js'
  const vuePath = vueNameSpace

  vueFiles.forEach((vue) => {
    const path = join(vuePath, `${vue}.vue`)
    const template = new sink.files.MustacheFile(
      projectRoot,
      path,
      getStub(options, `${vueNameSpace}/${vue}.txt`)
    )

    template.overwrite = true

    template.commit()
    sink.logger.action('create').succeeded(path)
  })
}

export function makeResources(
  projectRoot: string,
  sink: typeof sinkStatic,
  options: ScaffoldOptions
) {
  makeViews(projectRoot, sink, options)
  makeCss(projectRoot, sink, options)
  makeJs(projectRoot, sink, options)
  if (options.stack === 'vue') {
    makeVueFiles(projectRoot, sink, options)
  }
}
