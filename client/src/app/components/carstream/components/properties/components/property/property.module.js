
import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';

import { propertyComponent } from './property.component';

export const propertyModule = angular
    .module('cnb.variable.property', [angularAnimate, angularMaterial, 'dndLists'])
    .component('property', propertyComponent)
    .name;
