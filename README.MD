_Note this project is no longer maintained. A new version is in the works for AdonisJs v6. More details coming soon_

# Welcome to Adonis Flow

Adonis Flow is a full stack application scaffolding for [AdonisJs](https://adonisjs.com). AdonisJs Flow provides the perfect starting point for your next Adonisjs application and includes login, registration, email verification, profile management, session management, Api Token management, and transactional emails.

Adonis is designed using Tailwind CSS and [Edgejs](https://edgejs.dev/docs/introduction) scaffolding.

## Official Documentation

Documentation for Adonis Flow is in progress.

## Contributing

Thank you for considering contributing to Adonis Flow! But unfortunately contributions are not accepted at this time as this is a personal project. However contributions will be accepted in the future once the project is more mature.

## Prerequisites

_New Applications Only_

Adonis Flow should only be installed into new AdonisJs applications. Attempting to install Adonis Flow into an existing AdonisJs application will result in unexpected behavior and issues. In addition to that, your application should already have the following packages installed and configured:

- Encore (can be easily done at the point of creating the application)
- Lucid
- Auth
- Drive
- Mail
- Session
- attachment-lite

_Database_

Adonis Flow is designed to work with Postgres. However, it should be possible to use other databases with some minor changes.

## Getting Started

### Installation

```bash
npm install adonisjs-flow

# or
yarn add adonisjs-flow

# or
pnpm add adonisjs-flow
```

Next, configure the package using the configure command:

```bash
node ace configure adonisjs-flow
```

This will scaffold and create the necessary files.

### Usage

Before you can use Adonis Flow you need to update the following files inside your AdonisJs application:

```ts
// config/flow.ts
import type { MinuteNumbers } from 'luxon'

const flowConfig: FlowConfig = {
  /*
|--------------------------------------------------------------------------
| Stack Config - not implemented yet
|--------------------------------------------------------------------------
|
| The stack config is used to define the stack for which you want to 
| handle your views. The stack can be one of the following: edge, inertia
|
*/
  stack: 'edge',
  /*
|--------------------------------------------------------------------------
| Features config
|--------------------------------------------------------------------------
|
| Configure optional features for AdonisJs Flow

| termsAndPrivacyPolicy - not implemented yet
|
| verification - Allows you to configure how strict you want to be with email verification. Options are: strict, optional - strict forces users to verify their email before they can login, optional allows users to login without verifying their email.
|
| passwordConfirmation - Used alongside the password confirmation middleware. This is the number of minutes that the password confirmation is valid for. after this time the user will be prompted to confirm their password again for sensitive actions such as deleting their account. To make use of this feature you need to add the password confirmation middleware to your routes.
|
*/
  features: {
    termsAndPrivacyPolicy: false,
    verification: 'strict',
    passwordConfirmation: 5,
  },
  /*
|--------------------------------------------------------------------------
| Views Config
|--------------------------------------------------------------------------
|
| The views config is to handle all your view template file locations 
| in one convenient place, without needing to go digging inside the controllers, providers etc.to make small updates
|
*/
  views: {
    login: 'auth/login',
    register: 'auth/register',
    passwordResetRequest: 'auth/password-reset-request',
    passwordReset: 'auth/password-reset',
    verification: 'auth/verification',
    signedUrlInvalid: 'auth/signed-url-invalid',
    confirmPassword: 'auth/confirm-password',
    dashboard: 'dashboard/index',
    profile: 'dashboard/profile/edit',
    apiTokens: 'dashboard/api-tokens',
  },
}

export default flowConfig
```

Enable postcss in your webpack config

```ts
// webpack.config.ts
/*
|--------------------------------------------------------------------------
| CSS loaders
|--------------------------------------------------------------------------
|
| Uncomment one of the following line of code to enable support for
| PostCSS or CSS.
|
*/
Encore.enablePostCssLoader()
// Encore.configureCssLoader(() => {})
```

Setup your .env file

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
APP_KEY=app_key
DRIVE_DISK=local
SESSION_DRIVER=cookie
CACHE_VIEWS=false
DB_CONNECTION=pg
PG_HOST=127.0.0.1
PG_PORT=5432
PG_USER=lucid
PG_PASSWORD=
PG_DB_NAME=lucid
GITHUB_CLIENT_ID=clientId
GITHUB_CLIENT_SECRET=clientSecret
GOOGLE_CLIENT_ID=clientId
GOOGLE_CLIENT_SECRET=clientSecret
LINKEDIN_CLIENT_ID=clientId
LINKEDIN_CLIENT_SECRET=clientSecret
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USERNAME=<username>
SMTP_PASSWORD=<password>

```

Setup tailwind config

```ts
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
}
```

Setup postcss config

```ts
// postcss.config.js
module.exports = {
  plugins: [require('tailwindcss')()],
}
```

Configure the custom session provider

```ts
// providers/AppProvider.ts
import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const { DatabaseDriver } = await import('./SessionDriver')
    const Session = this.app.container.use('Adonis/Addons/Session')

    Session.extend('database', ({}, config, ctx) => {
      return new DatabaseDriver(ctx, config)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
```

Configure your events contract

```ts
// contracts/events.ts
/**
 * Contract source: https://git.io/JfefG
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import PasswordReset from 'App/Models/PasswordReset'
import type User from 'App/Models/User'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

declare module '@ioc:Adonis/Core/Event' {
  /*
  |--------------------------------------------------------------------------
  | Define typed events
  |--------------------------------------------------------------------------
  |
  | You can define types for events inside the following interface and
  | AdonisJS will make sure that all listeners and emit calls adheres
  | to the defined types.
  |
  | For example:
  |
  | interface EventsList {
  |   'new:user': UserModel
  | }
  |
  | Now calling `Event.emit('new:user')` will statically ensure that passed value is
  | an instance of the the UserModel only.
  |
  */
  interface EventsList {
    'user:register': User
    'user:login': { user: User; ctx: HttpContextContract }
    'user:logout': { ctx: HttpContextContract }
    'user:resetPasswordRequest': { user: User; token: string }
    'user:resetPassword': { user: User; passwordReset: PasswordReset }
    'user:delete': User
    'user:emailReset': User
    'mail:sendEmailVerification': User
  }
}
```

## License

AdonisJs Flow is open-sourced software licensed under the MIT license.
