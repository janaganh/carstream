import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';
import 'angular-drag-and-drop-lists';
import moment from 'moment';

import { dateComponent } from './date.component';

export const dateModule = angular
    .module('cnb.variable.date', [angularAnimate, angularMaterial, 'dndLists'])
    .config(function ($mdDateLocaleProvider) {
        'ngInject';
        $mdDateLocaleProvider.formatDate = function (date) {
            let m = moment(date);

            return m.isValid() ? m.format('YYYY-MM-DD') : '';
        };

        $mdDateLocaleProvider.parseDate = function (dateString) {
            let m = moment(dateString, ['YYYY-MM-DD'], true);

            return m.isValid() ? m.toDate() : new Date();
        };
    })
    .component('date', dateComponent)
    .name;
