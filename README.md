# NgFirebaseAuth

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.3.

This project is created to understand how to authenticate users using firebase auth in an angular app, this is a complete recreation of [**Full Angular 12 Firebase Authentication Tutorial Example**](https://www.positronx.io/full-angular-7-firebase-authentication-system/) by [Digamber Rawat](https://github.com/SinghDigamber/).
The tutorial all in itself wasn't enough to get the code working for angular 13, so had to check out the [@angular/fire docs for authentication](https://github.com/angular/angularfire/blob/HEAD/docs/auth/getting-started.md)

Things I did :- 

1. After creating an Angular App using `ng new <app-name>`, `cd` into the app.
2. Make sure `firebase` sdk is installed, `npm install firebase`.
3. Install `@angular/fire` library, their recommended way of installing didn't work, so use command `npm install firebase @angular/fire --save` instead.
4. Created a firebase project and web app (using firebase console) and copied the `firebaseConfig` from the app's settings page to `environments.ts` with key `firebase`. 
5. Followed the tutorial mentioned above.
6. When `ng serve` was issued initially it errored, had to add `"skipLibCheck": true` option to `compilerOptions` key of `tsconfig.json` file to fix the issue. 

#### Following were auto generated at the time of project creation
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
