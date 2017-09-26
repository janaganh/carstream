
import './properties.scss';
import template from './properties.html';
import controller from './properties.controller';

export const propertiesComponent = {
    template,
    restrict: 'E',
    controller,
    bindings: {
        property: '<',
        expression: '<'
    }

};
