
import PropertyBuilderService from './property.builder.service';
import StringType from './types/string.type';
import QuestionType from './types/question.type';
import QuestionPropertyBuilder from './builders/question.property.builder';
import GroupQuestionType from './types/group.question.type';
import GroupQuestionPropertyBuilder from './builders/group.question.property.builder'

describe('class: PropertyBuilderService', function() {

    let service = new PropertyBuilderService.getInstance();

    describe('getInstance()', function() {
        it('Instance created', function () {
            //assert.equals(instanceof(instance), PropertyBuilderService, 'Instance not created');
        });
    });

    describe('build()', function() {
        it('Build array of properties ', function () {
            let properties = [
                {
                    name: "Q1",
                    type: "question",
                    title: 'question1',
                    properties: [
                        {
                            name: "answer",
                            type: "string"
                        }
                    ]
                },
                {
                    name: "Q2",
                    type: "question",
                    title: 'question2',
                    properties: [
                        {
                            name: "answer",
                            type: "string"
                        }
                    ]
                },
            ];
            let result = service.build(properties);

            expect(result).to.be.an('object');
            expect(result).to.have.property('type');
            expect(result).to.have.property('builder');
            expect(result).to.have.property('properties');
            expect(result.type).to.an.instanceOf(GroupQuestionType);
            expect(result.builder).to.an.instanceOf(GroupQuestionPropertyBuilder);
            expect(result.properties).to.an.instanceOf(Array);
            expect(result.properties).to.have.lengthOf(2);

            expect(result.properties[0]).to.have.property('type');
            expect(result.properties[0]).to.have.property('name');
            expect(result.properties[0]).to.have.property('builder');
            expect(result.properties[0]).to.have.property('properties');
            expect(result.properties[0].name).to.equal('Q1');
            expect(result.properties[0].type).to.an.instanceOf(QuestionType);
            expect(result.properties[0].builder).to.an.instanceOf(QuestionPropertyBuilder);
            expect(result.properties[0].properties).to.an.instanceOf(Array);
            expect(result.properties[0].properties).to.have.lengthOf(2);
            expect(result.properties[0].properties[0]).to.have.property('name');
            expect(result.properties[0].properties[0].name).to.equal('answer');
            expect(result.properties[0].properties[0]).to.have.property('type');
            expect(result.properties[0].properties[0].type).to.an.instanceOf(StringType);

            expect(result.properties[1]).to.have.property('type');
            expect(result.properties[1]).to.have.property('name');
            expect(result.properties[1]).to.have.property('builder');
            expect(result.properties[1]).to.have.property('properties');
            expect(result.properties[1].name).to.equal('Q2');
            expect(result.properties[1].type).to.an.instanceOf(QuestionType);
            expect(result.properties[1].builder).to.an.instanceOf(QuestionPropertyBuilder);
            expect(result.properties[1].properties).to.an.instanceOf(Array);
            expect(result.properties[1].properties).to.have.lengthOf(2);
            expect(result.properties[1].properties[0]).to.have.property('name');
            expect(result.properties[1].properties[0].name).to.equal('answer');
            expect(result.properties[1].properties[0]).to.have.property('type');
            expect(result.properties[1].properties[0].type).to.an.instanceOf(StringType);
        });
    });
});