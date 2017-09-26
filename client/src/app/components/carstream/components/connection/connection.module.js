import angular from 'angular';
import 'angular-material/angular-material.css';
import angularAnimate from 'angular-animate';
import angularMaterial from 'angular-material';

import { connectionComponent }   from './connection.component';
import { connectionService } from '../../services/connection.service.module';

export const connectionModule = angular
    .module('connection', [angularAnimate, angularMaterial, connectionService])
    .component('connection', connectionComponent)
    .name;
