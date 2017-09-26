
import './date.scss';
import template from './date.html';
import controller from './date.controller';

export const dateComponent = {
    template,
    restrict: 'E',
    controller,
    bindings: {
        item: '<',
        index: '<'
    },
    require: {
        propsCtrl: '^properties'
    }
};
