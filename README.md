## Installing

Install the latest version of the Angular CLI.
Run NPM install

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

### Http

In Ionic projects we often want a native app as well as an webapp with the same code.
The build-in Angular HttpClient is great for webapps but less practical for native apps.
Native apps should not have to deal with CORS since this is a browser security feature.
Ofcourse if we want the webapp to deal with CORS we can not enable CORS from the API and sometimes we can not even control the API.

The HttpService class in the Http folder acts as a wrapper around Angular's HttpClient which formats the request in a way that can later be read by the HttpMobileInterceptor class.

Anyone that is familiar with Angular knows the HttpInterceptor pattern where (multiple) interceptor(s) can be added to the outgoing request pipeline.
To transform the outgoing request to use Ionic's native HttpClient the HttpMobileInterceptor should be used as the last interceptor.
This will intervene(when the current platform is native app) and use the native mobile HttpClient which do not have CORS restrictions and return the response in the same format as Angular's HttpClient.

### Pipes

The pipes should be fairly simple to use for anyone who is familiar with Angular.
