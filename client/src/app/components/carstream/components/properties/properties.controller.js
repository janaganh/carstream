export default class PropertiesController  {

    constructor(actions) {
        'ngInject';
        this.property = null;
        this.callStack = [];
        this.actions = actions;
    }

    $onInit() {
        this.addStack({ index: 0, property: this.property });

        if (this.expression.data) {
            this.buildStack();
        }
    }

    onPropertyChange(data) {
        this.addStack(data);
        this.createModel();
    }

    buildStack() {
        let data = this.copy(this.expression.data);
        let objects = data.obj.split('?.');
        let property = this.property;
        let selectedProperty;
        let i = 0;

        for (; i < objects.length; i++) {
            let object   = objects[i];

            if (i > 0) {
                property = selectedProperty;
            }
            selectedProperty = this.getSelectedProperty(object, property);
            if (objects.length === 1 || i === (objects.length - 1)) {
                this.addStack({ index: i, property, selectedProperty, data: this.copy(data) }, true);
            } else {
                this.addStack({ index: i, property, selectedProperty: selectedProperty }, true);
            }
        }

        if (data.function) {
            property = selectedProperty;
            selectedProperty = this.getSelectedProperty(data.function, property, data.negate);
            this.addStack({ index: i, property, selectedProperty, data: this.copy(data) }, true);
            i++;
        }

        this.createModel();
    }

    onModelChange(data) {
        this.callStack[data.index].data = data.data;
        this.createModel();
    }

    createModel() {
        let model = {};

        for (let i = 0; i < this.callStack.length; i++) {
            let data = this.callStack[i];
            let property = data.selectedProperty ? data.selectedProperty : data.property;
            let fragment = property.builder.createModel(property, data);

            if (fragment.hasOwnProperty('obj')) {
                let temp = Object.assign({}, fragment);

                delete temp.obj;
                model.obj = model.hasOwnProperty('obj') ? model.obj + '?.' + fragment.obj : fragment.obj;
                model = Object.assign(model, temp);
            } else {
                model = Object.assign(model, fragment);
            }
        }

        this.actions.changeDataModel(this.expression, model);
    }

    addStack(data, isPreserveData = false) {
        if (this.callStack.length === 0) {
            this.callStack.push(data);
            return;
        }

        let propertyData = data.data;

        // preserve previous property data
        if (this.isEquivalentFunction(data.selectedProperty, this.callStack[data.index].selectedProperty)) {
            if (this.callStack.length > data.index + 1) {
                propertyData = this.callStack[data.index + 1].data;
                isPreserveData = true;
            }
        }

        if (data.index < this.callStack.length) {
            this.callStack = this.callStack.slice(0, data.index + 1);
        }

        if (this.callStack.length > data.index) {
            let stack = this.callStack[data.index];

            stack.selectedProperty = data.selectedProperty;
            // clear the data
            if (!isPreserveData) {
                delete stack.data;
            }
            this.callStack[data.index] = stack;
        }
        if (isPreserveData) {
            this.callStack.push({ property: data.selectedProperty, data: propertyData });
        } else {
            this.callStack.push({ property: data.selectedProperty });
        }
    }

    getUI(index) {
        let element =  this.findProperty((ele, i) => i < index && ele.property.builder.hasUI());

        if (element) {
            return element.property.builder.getUI();
        }
        return 'default';
    }

    copy(source) {
        return Object.assign({}, source);
    }

    findProperty(predicate) {
        let property = null;

        for (let i = this.callStack.length - 1; i >= 0; i--) {
            let element = this.callStack[i];

            if (predicate(element, i) === true) {
                property = element;
                break;
            }
        }
        return property;
    }

    getSelectedProperty(name, property, negate = null) {
        let result;

        if (negate === true) {
            name = '!' + name;
        }

        if (property.properties) {
            result = property.properties.find(e => e.name === name);
        }
        return result;
    }

    isEquivalentFunction(current, previous) {
        return current && previous &&
                current.type.name === 'function' && previous.type.name === 'function' &&
                    current.type.isEquivalent(previous.type);
    }
}
