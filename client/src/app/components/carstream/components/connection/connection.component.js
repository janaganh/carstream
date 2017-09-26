// group.component.js

import './connection.scss';
import template from './connection.html';
import controller from './connection.controller';

export const connectionComponent = {
    template,
    restrict: 'E',
    controller,
    bindings: {
       onUpdate1: '&' 
    },
    require: {
        carstremCtrl: '^carstream'
    }
};

