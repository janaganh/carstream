import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import { queryComponent }   from './query.component';
import { connectionService } from '../../services/connection.service.module';

export const queryModule = angular
    .module('query', [angularAnimate, angularMaterial, connectionService])
    .component('query', queryComponent)
    .name;
