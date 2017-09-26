// expression.module.js

import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';

import { propertiesModule } from '../properties/properties.module';
import { expressionComponent } from './expression.component';

export const expressionModule = angular
    .module('cnb.expression', [angularAnimate, angularMaterial, propertiesModule, 'dndLists'])
    .component('expression', expressionComponent)
    .name;
