// app.module.js

import { carstreamModule } from './app/components/carstream/carstream.module';
import AppComponent from './app.component';

const appName = 'app';

angular.module(appName, [
    carstreamModule
]).component(appName, AppComponent);

angular.element(document).ready(() => {
    angular.bootstrap(document, [appName], { strictDi: true });
});
