// cnb.spec.js
import {cnbModule} from './cnb.module';
import imgAdd from './components/group/img/ic_add_white_24px.svg';
import imgAddGroup from './components/group/img/ic_playlist_add_white_24px.svg';
import imgRemove from './components/group/img/ic_clear_white_24px.svg';
import imgDragHandle from './components/group/img/ic_more_vert_white_24px.svg';
/*
    important!
    create the groups first in-order to get the correct sequence grp-<id> css classes
    so that you can find group like using: find(element,'grp-0') to get root, find(element, grp-1) get sub element of root...etc.
    following the rule will make testing easier by allowing to select groups in natural sequence of number. e.g grp-0,grp-1,grp-2....

 */
describe('Cnb Component', () => {
    let $rootScope,  $componentController, $compile, $templates, $httpBackend;

    beforeEach(window.module(cnbModule));

    beforeEach(window.module(
        'templates'
    ));

    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $componentController = $injector.get('$componentController');
        $compile = $injector.get('$compile');
        $templates = $injector.get('$templateCache');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/_karma_webpack_/fonts/ic_add_white_24px.svg')
            .respond(imgAdd);
        $httpBackend.when('GET', '/_karma_webpack_/fonts/ic_playlist_add_white_24px.svg')
            .respond(imgAddGroup);
        $httpBackend.when('GET', '/_karma_webpack_/fonts/ic_clear_white_24px.svg')
            .respond(imgRemove);
        $httpBackend.when('GET', '/_karma_webpack_/fonts/ic_more_vert_white_24px.svg')
            .respond(imgDragHandle);
    }));

    //findIn(template,'.add-group-btn').triggerHandler('click');
    //expect(template.find('h1').html()).to.eq('The Application Condtion Builder works!');

    describe('View', () => {
        // view layer specs.
        let scope, element

        beforeEach(() => {
            scope = $rootScope.$new();
            var ctrl = $componentController('cnb');
            ctrl.initSamplePropertyModel(sampleVarialeData());
            element = angular.element('<cnb></cnb>');
            $compile(element)(scope);
            scope.$digest();
         });

        //initial root group
        it('should create initial group structure', () => {
            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);
            //contains no sub elementns
            expect(find(element,'li').length).to.eq(0);
            //contains no conditionals
            expect(element.find('.condition').length).to.eq(0);
        });

        //add group to root group
        it('should add a new group', () => {
            find(element,'button[aria-label="Add group"]').triggerHandler('click');
            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);
            //root group contains a subgroup
            expect(find(element,'.group.grp-1 .group').length).to.eq(1);
            //sub group correctly rendered
            testGroup(find(element,'.group.grp-1 .group'));

            //root contains one element
            expect(find(element,'.group.grp-1 li').length).to.eq(1);

            //sub group contains no sub elementns
            expect(find(element,'.group.grp-2 li').length).to.eq(0);

            //contains no conditionals
            expect(element.find('.condition').length).to.eq(0);
        });

        //add expression to root group
        it('should add a new expression', () => {
            find(element,'button[aria-label="Add expression"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);
            //root group contains one expression
            expect(find(element,'.group.grp-1 .expression').length).to.eq(1);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression'));

            //root contains one element
            expect(find(element,'.group.grp-1 li').length).to.eq(1);

        });

        //add expression and group to root group
        it('should add a new expression and a new group', () => {

            /* !important always create groups first*/
            find(element,'.btn-container.grp-1 .actionButtons button[aria-label="Add group"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            //correctly rendered root group
            testGroup(find(element,'.group.grp-1') , true);

            //root group contains a subgroup
            expect(find(element,'.group.grp-1 .group').length).to.eq(1);
            //sub group correctly rendered
            testGroup(find(element,'.group.grp-1 .group'));

            //root group contains one expression
            expect(find(element,'.group.grp-1 .expression').length).to.eq(1);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression'));

            //root contains 2 elements
            expect(find(element,'.group.grp-1 li').length).to.eq(2);

            //sub group contains no sub elementns
            expect(find(element,'.group.grp-2 li').length).to.eq(0);

            //contains one conditionals
            expect(find(element,'.condition.grp-1').length).to.eq(1);
        });


        //add 2 expressions
        it('should add 2 expressions', () => {
            find(element,'.btn-container.grp-1 button[aria-label="Add expression"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add expression"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);

            //root group contains 2 expressions
            expect(find(element,'.group.grp-1 .expression').length).to.eq(2);

            //1st expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression')[0]);

            //2nd expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression')[1]);

            //root contains 2 elements
            expect(find(element,'.group.grp-1 li').length).to.eq(2);

            //contains one conditionals
            expect(find(element,'.condition').length).to.eq(1);
        });


        //add 3 expressions
        it('should add 3 expressions ', () => {
            find(element,'.btn-container.grp-1 button[aria-label="Add expression"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add expression"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add expression"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);

            //root group contains 3 expressions
            expect(find(element,'.group.grp-1 .expression').length).to.eq(3);

            //1st expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression')[0]);

            //2nd expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression')[1]);

            //3rd expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression')[2]);

            //root contains 3 elements
            expect(find(element,'.group.grp-1 li').length).to.eq(3);

            //contains one conditionals
            expect(find(element,'.condition').length).to.eq(2);
        });

        //add 2 groups to root group
        it('should add 2 groups', () => {
            find(element,'.btn-container.grp-1 button[aria-label="Add group"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add group"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);

            //root group contains 2 subgroups
            expect(find(element,'.group.grp-1 .group').length).to.eq(2);

            //sub 1st group correctly rendered
            testGroup(find(element,'.group.grp-2'));

            //sub 2nd group correctly rendered
            testGroup(find(element,'.group.grp-3'));

            //root contains 2 elements
            expect(find(element,'li.grp-1').length).to.eq(2);

            //1st sub group contains no sub elementns
            expect(find(element,'li.grp-2').length).to.eq(0);

            //2nd sub group contains no sub elementns
            expect(find(element,'li.grp-3').length).to.eq(0);

            //contains one conditionals
            expect(find(element,'.condition').length).to.eq(1);
        });


        //add 3 groups to root group
        it('should add 3 groups', () => {
            find(element,'.btn-container.grp-1 button[aria-label="Add group"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add group"]').triggerHandler('click');

            find(element,'.btn-container.grp-1 button[aria-label="Add group"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);

            //root group contains 3 subgroups
            expect(find(element,'.group .group').length).to.eq(3);

            //sub 1st group correctly rendered
            testGroup(find(element,'.group.grp-2'));

            //sub 2nd group correctly rendered
            testGroup(find(element,'.group.grp-3'));

            //sub 3nd group correctly rendered
            testGroup(find(element,'.group.grp-4'));

            //root contains 3 elements
            expect(find(element,'li.grp-1').length).to.eq(3);

            //1st sub group contains no sub elementns
            expect(find(element,'li.grp-2').length).to.eq(0);

            //2nd sub group contains no sub elementns
            expect(find(element,'li.grp-3').length).to.eq(0);

            //3rd sub group contains no sub elementns
            expect(find(element,'li.grp-4').length).to.eq(0);

            //contains one conditionals
            expect(find(element,'.condition').length).to.eq(2);
        });


        //add a simple nested group
        it('should add 4 nested groups', () => {
            find(element,'.btn-container.grp-1 .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-2 .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-3 .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-4 .actionButtons button[aria-label="Add group"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1'), true);

            //root group contains 1 subgroup
            expect(find(element,'.group.grp-1 .group.grp-2').length).to.eq(1);
            //sub group contains 1 subgroup
            expect(find(element,'.group.grp-2 .group.grp-3').length).to.eq(1);
            //sub group contains 1 subgroup
            expect(find(element,'.group.grp-3 .group.grp-4').length).to.eq(1);
            //sub group contains 1 subgroup
            expect(find(element,'.group.grp-4 .group.grp-5').length).to.eq(1);

            //sub group contains no subgroup
            expect(find(element,'.group.grp-5 .group').length).to.eq(0);


            //sub 1st group correctly rendered
            testGroup(find(element,'.group.grp-2'));
            //sub 2nd group correctly rendered
            testGroup(find(element,'.group.grp-3'));
            //sub 3rd group correctly rendered
            testGroup(find(element,'.group.grp-4'));
            //sub 4th group correctly rendered
            testGroup(find(element,'.group.grp-5'));

            //root contains 1 elements
            expect(find(element,'li.grp-1').length).to.eq(1);
            //1st sub group contains 1 element
            expect(find(element,'li.grp-2').length).to.eq(1);
            //2nd sub group contains 1 element
            expect(find(element,'li.grp-3').length).to.eq(1);
            //3rd sub group contains 1 element
            expect(find(element,'li.grp-4').length).to.eq(1);
            //4th sub group contains 1 element
            expect(find(element,'li.grp-5').length).to.eq(0);

            //contains no conditionals
            expect(find(element,'.condition').length).to.eq(0);
        });


        //add expression and group to root group and 2 expressions to sub group
        it('should add a new expression and a new group, new group should contain 2 expressions', () => {

            /* !important always create groups first*/
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1') , true);

            //root group contains a subgroup
            expect(find(element,'.group.grp-1 .group').length).to.eq(1);
            //sub group correctly rendered
            testGroup(find(element,'.group.grp-1 .group'));

            //root group contains one expression
            expect(find(element,'.group.grp-1 .expression.grp-1').length).to.eq(1);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression.grp-1'));

            //sub group contains 2 expressions
            expect(find(element,'.group.grp-2 .expression.grp-2').length).to.eq(2);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[0]);

            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[1]);

            //root contains 2 elements
            expect(find(element,'.group.grp-1 li.grp-1').length).to.eq(2);

            //sub group contains 2 sub elementns
            expect(find(element,'.group.grp-2 li').length).to.eq(2);

            //root contains one conditionals
            expect(find(element,'.condition.grp-1').length).to.eq(1);

            //sub group contains one conditionals
            expect(find(element,'.condition.grp-2').length).to.eq(1);

        });


        //add expression and group to root group and 2 expressions to sub group
        it('should add a new expression and a new group, new group should contain 2 expressions, change sub-group to OR condition', () => {

            /* !important always create groups first*/
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.condition.grp-2 button[aria-label="Toggle condition"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1') , true);

            //root group contains a subgroup
            expect(find(element,'.group.grp-1 .group').length).to.eq(1);

            //sub group correctly rendered
            testGroup(find(element,'.group.grp-1 .group'), false, 'OR');

            //root group contains one expression
            expect(find(element,'.group.grp-1 .expression.grp-1').length).to.eq(1);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression.grp-1'));

            //sub group contains 2 expressions
            expect(find(element,'.group.grp-2 .expression.grp-2').length).to.eq(2);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[0]);

            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[1]);

            //root contains 2 elements
            expect(find(element,'.group.grp-1 li.grp-1').length).to.eq(2);

            //sub group contains 2 sub elementns
            expect(find(element,'.group.grp-2 li').length).to.eq(2);

            //root contains one conditionals
            expect(find(element,'.condition.grp-1').length).to.eq(1);

            //sub group contains one conditionals
            expect(find(element,'.condition.grp-2').length).to.eq(1);

        });

        //add expression and group to root group and 2 expressions to sub group
        it('should add a new expression and a new group, new group should contain 2 expressions, remove 1 expression', () => {

            /* !important always create groups first*/
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add group"]').triggerHandler('click');
            find(element,'.btn-container.grp-1  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');
            find(element,'.btn-container.grp-2  .actionButtons button[aria-label="Add expression"]').triggerHandler('click');

            //correctly rendered root group
            testGroup(find(element,'.group.grp-1') , true);

            //root group contains a subgroup
            expect(find(element,'.group.grp-1 .group').length).to.eq(1);
            //sub group correctly rendered
            testGroup(find(element,'.group.grp-1 .group'));

            //root group contains one expression
            expect(find(element,'.group.grp-1 .expression.grp-1').length).to.eq(1);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-1 .expression.grp-1'));

            //sub group contains 2 expressions
            expect(find(element,'.group.grp-2 .expression.grp-2').length).to.eq(2);
            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[0]);

            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2')[1]);

            //root contains 2 elements
            expect(find(element,'.group.grp-1 li.grp-1').length).to.eq(2);

            //sub group contains 2 sub elementns
            expect(find(element,'.group.grp-2 li').length).to.eq(2);

            //root contains one conditionals
            expect(find(element,'.condition.grp-1').length).to.eq(1);

            //sub group contains one conditionals
            expect(find(element,'.condition.grp-2').length).to.eq(1);

            //remove first expression from sub group
            find(element,'.expression.grp-2:first-child button[aria-label="Remove expression"]').triggerHandler('click');;

            //sub group contains 1 expression
            expect(find(element,'.group.grp-2 .expression.grp-2').length).to.eq(1);

            //expresion correctly rendered
            testExpression(find(element,'.group.grp-2 .expression.grp-2'));

            //sub group contains 1 sub element
            expect(find(element,'.group.grp-2 li').length).to.eq(1);

            //sub group contains no conditionals
            expect(find(element,'.condition.grp-2').length).to.eq(0);


        });



    });

});



function find(element, selector) {
    if (element[0])
        return angular.element(element[0].querySelectorAll(selector));
    else
        return angular.element(element.querySelectorAll(selector));
}

function testExpression(element){
    expect(find(element,'.dragHandle').length).to.eq(1);
    expect(find(element,'md-select').length).to.eq(3); // click defaults to creating a expression with the first question in the root group

}

function testGroup(element, isRoot = false, condition = 'AND') {
    let grp = groupClass(element);
    testGroupCommons(element, grp);
    let btnContainer =   find(element,'.btn-container'+grp);

    if (isRoot) {
        //test handle should be not there
        expect(find(btnContainer, '.dragHandle').length).to.eq(0);
        //test for remove button - should be not there
        expect(find(btnContainer,'.actionButtons button[aria-label="Remove"]').length).to.eq(0);
    }
    else {
        //test handle should be there
        expect(find(btnContainer, '.dragHandle').length).to.eq(1);
        //test for remove button - should be there
        expect(find(btnContainer,'.actionButtons button[aria-label="Remove"]').length).to.eq(1);
    }

    testConditionals(element, grp , condition);
}

//generic group test
function testGroupCommons(element, grp){
    //test general ui elements
    expect(find(element,'ul'+grp).length).to.eq(1);
    expect(find(element,'.btn-container'+grp).length).to.eq(1);
    //test buttons are in correct order
    let btnContainer =   find(element,'.btn-container'+grp +' .actionButtons');
    expect(find(btnContainer,'button[aria-label="Add expression"]').length).to.eq(1);
    expect(find(btnContainer,'button[aria-label="Add group"]').length).to.eq(1);
}

//check number of conditionals
function testConditionals(element, grp, condition = 'AND'){
    let listSize = find(element,'li'+grp).length;
    let conditionsSize = find(element,'.condition'+grp).length;
    if (listSize > 1)
        expect(listSize - conditionsSize).to.eq(1, 'number of conditions are in-correct');
    else
        expect(find(element, '.condition'+grp).length).to.eq(0);

    let conditions = find(element,'.condition'+grp);
    for (let i = 0; i < conditions.length; i++) {
        let c = conditions[i];
        expect(find(c, 'button').text()).to.be.equal(condition);
    }

}


function groupClass(element){
    if (element[0])
        return '.'+element[0].className.match(/grp-[0-9]*/)[0];
    else
        return '.'+element[0].className.match(/grp-[0-9]*/)[0];
}


function sampleVarialeData(){
    return(
    {
        name   : 'QG2',
        type: 'group_question',
        title:'this questions2',
        properties: [
            {
                name: "Q1",
                type: "question",
                title:'this questions',
                properties : [
                    {
                        name: "answer",
                        type: "string"
                    }
                ]
            },
            {
                name:"QG1",
                type: "group_question",
                title:'this questions',
                properties : [
                    {
                        name: "Q2",
                        type: "question",
                        title:'this questions2',
                        properties : [
                            {
                                name: "answer",
                                type: "integer"
                            }
                        ]
                    },
                    {
                        name: "Q3",
                        type: "question",
                        title:'this questions2',
                        properties : [
                            {
                                name: "answer",
                                type: "date"
                            }
                        ]
                    },
                    {
                        name: "Q15",
                        type: "multi_select_question",
                        title:'this multi select questions2',
                        properties : [
                            {
                                name: "answers",
                                type: "collection",
                                collection: {
                                    type: 'select_option',
                                    properties: [
                                        {
                                            name: 'value',
                                            type:'integer'
                                        }
                                    ]
                                }

                            }
                        ],
                        options: [
                            {
                                label: "apple",
                                value:"1"
                            },
                            {
                                label: "orange",
                                value:"2"
                            }
                        ]

                    }
                ]
            },

        ]
    }
    );
}
