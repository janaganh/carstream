
import './property.scss';
import template from './property.html';
import controller from './property.controller';

export const propertyComponent = {
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
