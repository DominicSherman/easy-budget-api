import {createVariableCategoryResolver, getVariableCategoryResolver} from './resolvers/variable-category-resolvers';

export default {
    Mutation: {
        createVariableCategory: createVariableCategoryResolver
    },
    Query: {
        variableCategories: getVariableCategoryResolver
    }
};
