// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  /*firebase: {
    projectId: 'french-lang-app',
    appId: '1:1006515421803:web:bf1c97e0449e178382e72e',
    databaseURL: 'https://french-lang-app-default-rtdb.europe-west1.firebasedatabase.app',
    storageBucket: 'french-lang-app.appspot.com',
    apiKey: 'AIzaSyBuXUg_3ZYEPXV1EHmPTaQz9-Xl3U8TgsE',
    authDomain: 'french-lang-app.firebaseapp.com',
    messagingSenderId: '1006515421803',
    measurementId: 'G-51079DDESG',
  },*/
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBuXUg_3ZYEPXV1EHmPTaQz9-Xl3U8TgsE",
    authDomain: "french-lang-app.firebaseapp.com",
    projectId: "french-lang-app",
    storageBucket: "french-lang-app.appspot.com",
    databaseURL: 'https://french-lang-app-default-rtdb.europe-west1.firebasedatabase.app',
    messagingSenderId: "1006515421803",
    appId: "1:1006515421803:web:bf1c97e0449e178382e72e",
    measurementId: "G-51079DDESG"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
