import BasePropertyController from '../base.property.controller';

export default class DateController  extends BasePropertyController {

    constructor(actions, $mdDateLocale) {
        'ngInject';
        super();
        this.actions = actions;
        this.mdDateLocale = $mdDateLocale;
        this.selectedDate = new Date();
    }

    $onInit() {
        super.$onInit();

        if (this.isShowDatePicker()) {
            this.setSelectedDate();
            this.onDateChange();
        }
    }

    onDateChange() {
        this.value = this.mdDateLocale.formatDate(this.selectedDate);
        this.onModelChange();
    }

    isShowDatePicker() {
        let methods = ['equals', 'after', 'before'];

        return methods.includes(this.property.name) || methods.map(name => '!' + name).includes(this.property.name);
    }

    setSelectedDate() {
        this.selectedDate = this.mdDateLocale.parseDate(this.value);
    }
}
