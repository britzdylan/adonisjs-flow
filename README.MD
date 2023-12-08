# Welcome to Adonis Flow

## Getting Started

- [Installation](##installation)
- [Usage](#usage)
- [Commands](#commands)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm install -d adonis-flow
```

## Usage

```bash
node ace configure adonisjs-flow
```

### Setup

- Setup Adonis Flow configuration file

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
| in one convenient place, without needing to go digging inside the controllers, providers etc.to make 
| small updates
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

interface FlowFeatures {
  termsAndPrivacyPolicy: boolean
  verification: 'strict' | 'relaxed'
  passwordConfirmation: MinuteNumbers
}

interface FlowViews {
  login: string
  register: string
  verification: string
  passwordResetRequest: string
  passwordReset: string
  signedUrlInvalid: string
  confirmPassword: string
  dashboard: string
  profile: string
  apiTokens: string
}

interface FlowConfig {
  stack: 'edge' | 'inertia'
  features: FlowFeatures
  views: FlowViews
}

export default flowConfig
```

- Setup your .env file

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_URL=http://${HOST}:${PORT}
APP_KEY=YU0zZ7cD14XyEtl5xjU1tlSUo1_pgjs0
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

- Setup tailwind config

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

- Configure the custom session provider

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

- Configure your events contract

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
