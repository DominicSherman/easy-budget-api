import {gql} from 'apollo-server-express';

import {expense} from './schema-types/expense';
import {variableCategory} from './schema-types/variable-category';
import {timePeriod} from './schema-types/time-period';
import {root} from './schema-types/root';
import {fixedCategory} from './schema-types/fixed-category';

const schema = gql`
${root}
${timePeriod}
${variableCategory}
${fixedCategory}
${expense}
`;

export default schema;
