## Installing

- Install the latest version of the Angular CLI.
- Run NPM install

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## The classes

### IfPlatformIs Structural Directive

Ionic projects enable us to develop an app that can be run from any platform.
There are some usecases in which we only want to render a certain component when on a specific platform.
A naive solution might be to use Angulars NgIf in the (parent) components template and detect the platform in the components TypeScript.
The problem with this solution is that it bloats your component and causes repatative code.

IfPlatformIs offers an elegant solution to this problem and has an easy to use API with autocomplete.

// code block
