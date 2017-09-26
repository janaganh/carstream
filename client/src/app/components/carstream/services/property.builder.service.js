import BuilderFactory from './builders/builder.factory';

export default class PropertyBuidlerService {

    static getInstance() {
        return new PropertyBuidlerService();
    }

    build(propertiesData) {
        if (Array.isArray(propertiesData)) {
            return this.buildInGroup(propertiesData);
        } else {
            return this.findNBuild(propertiesData);
        }
    }

    buildInGroup(properties) {
        let data = { type: 'group_question', properties };

        return BuilderFactory.getBuilder('group_question').build(data);
    }

    findNBuild(propertyData) {
        return BuilderFactory.findBuilder(propertyData).build(propertyData);
    }
}
