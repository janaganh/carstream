// cnb.builder.service.spec.js

import {cnbBuilderService} from './cnb.builder.service';

describe('class: CnbBuilderService', function() {

    let service = cnbBuilderService;

    describe('creational methods', function() {
        describe('createGroup()', function () {
            it('new group', function () {
                let result = {
                    id: 2,
                    type: 'group',
                    condition:'AND',
                    allowedTypes: ['group', 'expression'],
                    expressions: []
                };
                assert.deepEqual(service.createGroup(getRoot()), result);
            });
        });

        describe('createExpression()', function () {
            it('new expression', function () {
                let result = {
                    id: 2,
                    type: 'expression',
                    allowedTypes: [],
                }
                assert.deepEqual(service.createExpression(getRoot()), result);
            });
        });


        describe('createRootGroup()', function () {
            it('root group', function () {
                let result = {
                    id: 1,
                    nextId: 2,
                    type: 'root',
                    condition:'AND',
                    allowedTypes: ['group', 'expression'],
                    expressions: []
                };
                assert.deepEqual(service.createRootGroup(), result);
            });
        });
    });

    describe('add/remove methods', function () {

        describe('addGroup()', function () {

            it('adding group', function () {
                let result  = {
                    id: 1,
                    type: 'root',
                    condition:'AND',
                    nextId: 3,
                    allowedTypes: ['group', 'expression'],
                    expressions: [{
                        id: 2,
                        type: 'group',
                        condition:'AND',
                        allowedTypes: ['group', 'expression'],
                        expressions: []
                    }]
                }
                let root = service.addGroup(getRoot());
                assert.deepEqual(root, result);
            });
        });

        describe('addExpression()', function () {

            it('adding expression', function () {
                let result  = {
                    id: 1,
                    nextId: 3,
                    type: 'root',
                    condition:'AND',
                    allowedTypes: ['group', 'expression'],
                    expressions: [{
                        id: 2,
                        type: 'expression',
                        allowedTypes: [],
                    }]
                }
                let root = service.addExpression(getRoot());
                assert.deepEqual(root, result);
            });
        });


        describe('removeExpression()', function () {

            let root = getRoot();

            it('removing expression', function () {

                root = service.addExpression(root);
                let result  = {
                    id: 1,
                    nextId: 3,
                    type: 'root',
                    condition:'AND',
                    allowedTypes: ['group', 'expression'],
                    expressions: []
                }
                let expression = root.expressions[0];
                root = service.removeExpression(root,expression);
                assert.deepEqual(root, result);
            });

            it('removing group', function () {

                let root = getRoot();
                root = service.addGroup(root);
                let group = root.expressions[0];
                let result  = {
                    id: 1,
                    nextId: 3,
                    type: 'root',
                    condition:'AND',
                    allowedTypes: ['group', 'expression'],
                    expressions: []
                }
                service.removeExpression(root,group);
                assert.deepEqual(root, result);
            });
        });

    });
});

function getRoot(){
    return {
        id: 1,
        nextId: 2,
        type: 'root',
        condition:'AND',
        allowedTypes: ['group', 'expression'],
        expressions: []
    };
}