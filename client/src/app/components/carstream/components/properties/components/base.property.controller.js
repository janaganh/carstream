export default class BasePropertyController {

    $onInit() {
        this.property = this.item.property;
        this.selectedProperty = null;

        if (Array.isArray(this.item.property.properties)) {
            if (this.item.selectedProperty) {
                this.selectedProperty = this.item.property.properties.find(e => this.item.selectedProperty.name === e.name);
            } else {
                if (this.item.property.properties.length > 0) {
                    this.selectedProperty = this.item.property.properties[0];
                    if (this.selectedProperty) {
                        this.onPropertyChange();
                    }
                }
            }
        }

        if (this.isPrimitive) {
            this.value = this.item.data ? (this.item.data.value ? this.item.data.value : null) : null;
        }

        if (this.hasOperators) {
            let operator = this.item.data ? (this.item.data.operator ? this.item.data.operator : null) : null;

            this._operator = this.operators.find(e => e.operator === operator);
        }
    }

    get index() {
        return this._index;
    }

    set index(index) {
        this._index = index;
    }

    get property() {
        return this._property;
    }

    set property(property) {
        return this._property = property;
    }

    getPropertyNameText(property) {
        return property.title ? property.title : (property.userFriendlyName ? property.userFriendlyName : property.name);
    }

    get selectedProperty() {
        return this._selectedProperty;
    }

    set selectedProperty(property) {
        this._selectedProperty = property;
    }

    get properties() {
        return this._property.properties;
    }

    get isPrimitive() {
        return this._property.type.isPrimitiveType;
    }

    get isObject() {
        return !this.isPrimitive;
    }

    get hasOperators() {
        return this._property.type.hasOperators;
    }

    set operator(operator) {
        this._operator = operator;
    }

    get operator() {
        return this._operator;
    }

    set value(value) {
        this._value = value;
    }

    get value() {
        return this._value;
    }

    get operators() {
        return this._property.type.operators;
    }

    onPropertyChange() {
        this.propsCtrl.onPropertyChange(this);
    }

    onModelChange() {
        this.propsCtrl.onModelChange(this);
    }

    get data() {
        return {
            value: this._value,
            operator: this._operator ? this._operator.operator : null
        };
    }
}
