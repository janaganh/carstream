// cnb.module.js

import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';

import { connectionModule } from './components/connection/connection.module';
import { carstreamComponent } from './carstream.component';

let module = angular
    .module('carstream', [angularAnimate, angularMaterial, connectionModule])
    .component('carstream', carstreamComponent)
    .config(['$mdThemingProvider', ($mdThemingProvider) => {
        $mdThemingProvider.theme('default');
    }]);

export const  carstreamModule = module.name;
