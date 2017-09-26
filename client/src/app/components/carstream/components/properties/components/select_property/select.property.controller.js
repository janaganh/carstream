import BasePropertyController from '../base.property.controller';

export default class SelectPropertyController  extends BasePropertyController {

    constructor(actions) {
        'ngInject';
        super();
        this.actions = actions;
        this._options = null;
        this._selectProperty = null;
    }

    $onInit() {
        super.$onInit();
        // set options
        this._selectProperty = this.propsCtrl.findProperty(e => e.property.type.name === 'select_question' || e.property.type.name === 'multi_select_question');

        if (this._selectProperty) {
            if (this._selectProperty.property.options) {
                this._options = this._selectProperty.property.options;

                // eslint-disable-next-line eqeqeq
                this.selectedOption = this._options.find(e => e.value == this.value);
            }
        }
    }

    isShowOptions() {
        let CHECK_NONE = 0;
        let CHECK_PRIMITIVE = 1;
        let CHECK_OBJECT = 2;
        let check = CHECK_NONE;

        if (!this._options || this._options.length === 0) {
            return false;
        }

        if (this.property.type.name !== 'function' && this.property.type.isPrimitiveType) {
            check = this.property.name === 'value' ? CHECK_PRIMITIVE : CHECK_NONE;
        } else {
            let previousIndex = this.index - 1;
            let previousProperty = this.propsCtrl.findProperty((e, i) => i === previousIndex);

            check = previousProperty && previousProperty.property.name === 'value' ? CHECK_OBJECT : CHECK_NONE;
        }

        if (check === CHECK_PRIMITIVE) {
            return this.operator && (this.operator.operator === '==' || this.operator.operator === '!=');
        } else if (check === CHECK_OBJECT) {
            return ['contains', '!contains', 'equals', '!equals'].includes(this.property.name);
        }
        return false;
    }

    get options() {
        return this._options;
    }

    onOptionChange() {
        this.value = this.selectedOption.value;
        this.onModelChange();
    }

    get data() {
        return {
            value: this.value,
            negate: this.negate,
            operator: this.operator ? this.operator.operator : null
        };
    }

}
