
import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';

import { dateModule } from './components/date/date.module';
import { propertyModule } from  './components/property/property.module';
import { selectPropertyModule } from  './components/select_property/select.property.module';

import { propertiesComponent } from './properties.component';

export const propertiesModule = angular
    .module('cnb.properties', [angularAnimate, angularMaterial, dateModule, propertyModule, selectPropertyModule, 'dndLists'])
    .component('properties', propertiesComponent)
    .name;
