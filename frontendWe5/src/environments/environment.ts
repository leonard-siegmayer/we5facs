// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // oauth config
  oAuth_client_id: "50ac33f0efa32d69545af2331f0b03147aaa643afc836aba156a953472a3162d",
  oAuth_url: "https://gitlab.rz.uni-bamberg.de/oauth/authorize",
  oAuth_response_type: "code",
  oAuth_scope: "openid%20email",
  // rest API config
  API_HOST: 'http://localhost',
  API_PORT: 8084,
  REDIRECT_HOST: 'http://localhost',
  REDIRECT_PORT: 80
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
