import {createVariableCategoryResolver, getVariableCategoryResolver} from './resolvers/variable-category-resolvers';

export default {
    Query: {
        variableCategories: getVariableCategoryResolver
    },
    Mutation: {
        createVariableCategory: createVariableCategoryResolver
    }
};
