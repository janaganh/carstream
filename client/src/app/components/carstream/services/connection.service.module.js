import angular from 'angular';

import ConnectionService from './connection.service';

const service = new ConnectionService();

export const connectionService = angular
    .module('connectionService', [])
    .factory('connectionService', [() => service])
    .name;
