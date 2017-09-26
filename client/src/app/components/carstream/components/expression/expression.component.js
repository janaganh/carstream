// expression.component.js

import './expression.scss';
import template from './expression.html';
import controller from './expression.controller';

export const expressionComponent = {
    template,
    restrict: 'E',
    controller,
    bindings: {
        expression: '<',
        parent: '<',
        isLast: '<'
    },
    require: {
        cnbCtrl: '^cnb'
    }
};
