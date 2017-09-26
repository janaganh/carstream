// cnb.builder.service
import TreeModel from 'tree-model';
/* to do
 support other expression building operations
*/
class CnbBuilderService {

    constructor() {
        this.treeModel =  new TreeModel({ childrenPropertyName: 'expressions' });
    }

    getNextId(root) {
        return root.nextId++;
    }

    createGroup(root, condition = 'AND') {
        return {
            id: this.getNextId(root),
            type: 'group',
            condition,
            allowedTypes: ['group', 'expression'],
            expressions: []
        };
    }

    getTreeModel(...objects) {
        return objects.map((object) => this.treeModel.parse(object));
    }

    createExpression(root, dataModel = null) {
        if (dataModel === null) {
            return {
                id: this.getNextId(root),
                type: 'expression',
                allowedTypes: []
            };
        } else {
            return {
                id: this.getNextId(root),
                type: 'expression',
                allowedTypes: [],
                data: dataModel
            };
        }
    }

    createRootGroup() {
        return  {
            id: 1,
            type: 'root',
            nextId: 2,
            condition: 'AND',
            allowedTypes: ['group', 'expression'],
            expressions: []
        };
    }

    clone(obj) {
        return Object.assign({}, obj);
    }

    addGroup(root, group = null) {
        root = this.clone(root);
        let [rootModel, groupModel] = this.getTreeModel(root, this.createGroup(root));

        // add to root tree if no group is provided
        if (group === null) {
            rootModel.addChild(groupModel);
        } else {
            let parentModel = rootModel.first((node) => node.model.id === group.id);

            parentModel.addChild(groupModel);
        }

        return root;
    }

    addExpression(root, group = null, dataModel = null) {
        root   =  this.clone(root);
        let [rootModel, expressionModel] = this.getTreeModel(root, this.createExpression(root, dataModel));

        if (group === null) {
            rootModel.addChild(expressionModel);
        } else {
            let parentModel =  rootModel.first((node) => node.model.id === group.id);

            parentModel.addChild(expressionModel);
        }

        return root;
    }

    toggleCondition(root, group = null) {
        root = this.clone(root);

        let [rootModel] = this.getTreeModel(root);
        let groupModel = rootModel;

        if (group !== null) {
            groupModel =  rootModel.first((node) => node.model.id === group.id);
        }

        if (groupModel.model.condition === 'AND') {
            groupModel.model.condition = 'OR';
        } else {
            groupModel.model.condition = 'AND';
        }

        return root;
    }

    removeExpression(root, expression) {
        root   =  this.clone(root);
        let [rootModel] = this.getTreeModel(root);
        let expressionModel =  rootModel.first((node) => node.model.id === expression.id);

        if (!expressionModel.isRoot()) {
            expressionModel.drop();
        }
        return root;
    }

    moveExpression(root, target, targetIndex, move) {
        root   =  this.clone(root);
        move   =  this.clone(move);
        let oldMoveId = move.id;

        // get a new id
        move.id = this.getNextId(root);

        let [rootModel, moveModel] = this.getTreeModel(root, move);
        let targetModel =  rootModel.first((node) => node.model.id === target.id);

        // add the copied moved element to the target element
        if (targetModel.hasChildren() && targetModel.children.length > targetIndex) {
            targetModel.addChildAtIndex(moveModel, targetIndex);
        } else {
            targetModel.addChild(moveModel);
        }
        // delete original moved element from the source element
        moveModel = rootModel.first((node) => node.model.id === oldMoveId);
        moveModel.drop();

        return root;
    }

    changeDataModel(root, expression, dataModel) {
        root = this.clone(root);
        let targetExpression = this.findExpression(root, expression.id);

        if (targetExpression) {
            targetExpression.data = dataModel;
        }
        return root;
    }

    removeDataModel(root, expression) {
        root = this.clone(root);
        let targetExpression = this.findExpression(root, expression.id);

        if (targetExpression) {
            delete targetExpression.data;
        }

        return root;
    }

    findExpression(root, id) {
        let [rootModel] = this.getTreeModel(root);
        let  node = rootModel.first((nodeElement) => nodeElement.model.id === id);

        if (node) {
            return node.model;
        }
        return null;
    }

}

export const cnbBuilderService = new CnbBuilderService();
