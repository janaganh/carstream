import BaseController from '../base.controller';
import imgRemove from './img/ic_clear_white_24px.svg';
import imgDragHandle from './img/ic_more_vert_white_24px.svg';

export default class ExpressionController extends BaseController {

    constructor(actions) {
        'ngInject';
        super(actions);
        this.img = {
            remove: imgRemove,
            dragHandle: imgDragHandle
        };
    }

    get properties() {
        return this.cnbCtrl.properties;
    }

    toggleCondition() {
        this.actions.toggleCondition(this.parent);
    }
}
