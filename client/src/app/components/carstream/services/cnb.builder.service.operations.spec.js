// cnb.builder.service.operations.spec.js

import {cnbBuilderService} from './cnb.builder.service';

describe('class: CnbBuilderService', function() {

    let service = cnbBuilderService;

    describe('expression creation operations', function () {
        it('Add group to a group', function () {

             let root  = service.createRootGroup();
             root = service.addGroup(root);
             let group1 = root.expressions[0];
             root = service.addGroup(root, group1);

            let result  = {
                id: 1,
                type: 'root',
                nextId: 4,
                allowedTypes: ['group', 'expression'],
                condition: 'AND',
                expressions: [
                    {
                        id: 2,
                        type: 'group',
                        condition: 'AND',
                        allowedTypes: ['group', 'expression'],
                        expressions: [
                            {
                                id: 3,
                                type: 'group',
                                condition:'AND',
                                allowedTypes: ['group', 'expression'],
                                expressions: []
                            }
                        ]
                    },
                ]
            }
            assert.deepEqual(result, root);
        });

        it('Add a expression to a group', function () {
            let root  = service.createRootGroup();
            root = service.addGroup(root);
            let group1 = root.expressions[0];
            root = service.addExpression(root, group1);

            let result  = {
                id: 1,
                type: 'root',
                nextId: 4,
                condition: 'AND',
                allowedTypes: ['group', 'expression'],
                expressions: [
                    {
                        id: 2,
                        type: 'group',
                        condition: 'AND',
                        allowedTypes: ['group', 'expression'],
                        expressions: [
                            {
                                id: 3,
                                type: "expression",
                                allowedTypes: [],
                            }
                        ]
                    },
                ]
            }
            assert.deepEqual(result, root);
        });
    });
});
