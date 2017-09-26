
import './select.property.scss';
import template from './select.property.html';
import controller from './select.property.controller';

export const selectPropertyComponent = {
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
