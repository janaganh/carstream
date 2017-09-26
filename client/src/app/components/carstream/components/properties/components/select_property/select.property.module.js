
import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';

import { selectPropertyComponent } from './select.property.component';

export const selectPropertyModule = angular
    .module('cnb.variable.select.property', [angularAnimate, angularMaterial, 'dndLists'])
    .component('selectProperty', selectPropertyComponent)
    .name;
