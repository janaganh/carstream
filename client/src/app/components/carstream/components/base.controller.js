// base.controller.js

export default class BaseController {

    constructor(actions) {
        'ngInject';
        this.actions = actions;
    }

    removeExpression() {
        this.actions.removeExpression(this.expression);
    }

    get boxClass() {
        if (this.isLast) {
            return 'last-box';
        }
        return 'box';
    }

    get showCondition() {
        return this.expression.type !== 'root' && this.parent.expressions.indexOf(this.expression) > 0;
    }

    get groupClass() {
        return 'grp-'  + this.expression.id;
    }

    get groupParentClass() {
        return 'grp-' + this.parent.id;
    }
}
