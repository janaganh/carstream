// group.component.js

import './query.scss';
import template from './query.html';
import controller from './query.controller';

export const queryComponent = {
    template,
    restrict: 'E',
    controller,
    require: {
        carstremCtrl: '^carstream'
    }
};

