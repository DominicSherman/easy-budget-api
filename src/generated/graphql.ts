export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type CreateExpense = {
  expenseId: Scalars['String'],
  userId: Scalars['String'],
  variableCategoryId: Scalars['String'],
  timePeriodId: Scalars['String'],
  amount: Scalars['Float'],
  date: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type CreateFixedCategory = {
  fixedCategoryId: Scalars['String'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  paid: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
};

export type CreateTimePeriod = {
  timePeriodId: Scalars['String'],
  beginDate: Scalars['String'],
  endDate: Scalars['String'],
  userId: Scalars['String'],
};

export type CreateVariableCategory = {
  variableCategoryId: Scalars['String'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
};

export type Expense = {
   __typename?: 'Expense',
  expenseId: Scalars['ID'],
  userId: Scalars['String'],
  variableCategoryId: Scalars['String'],
  timePeriodId: Scalars['String'],
  amount: Scalars['Float'],
  date: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  variableCategory: VariableCategory,
};

export type FixedCategory = {
   __typename?: 'FixedCategory',
  fixedCategoryId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  paid: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createExpense: Expense,
  createFixedCategory: FixedCategory,
  createTimePeriod: TimePeriod,
  createVariableCategory: VariableCategory,
  deleteExpense: Scalars['String'],
  deleteFixedCategory: Scalars['String'],
  deleteVariableCategory: Scalars['String'],
  updateExpense: Expense,
  updateFixedCategory: FixedCategory,
  updateVariableCategory: VariableCategory,
};


export type MutationCreateExpenseArgs = {
  expense: CreateExpense
};


export type MutationCreateFixedCategoryArgs = {
  fixedCategory: CreateFixedCategory
};


export type MutationCreateTimePeriodArgs = {
  timePeriod: CreateTimePeriod
};


export type MutationCreateVariableCategoryArgs = {
  variableCategory: CreateVariableCategory
};


export type MutationDeleteExpenseArgs = {
  userId: Scalars['String'],
  expenseId: Scalars['String']
};


export type MutationDeleteFixedCategoryArgs = {
  userId: Scalars['String'],
  fixedCategoryId: Scalars['String']
};


export type MutationDeleteVariableCategoryArgs = {
  userId: Scalars['String'],
  variableCategoryId: Scalars['String']
};


export type MutationUpdateExpenseArgs = {
  expense: UpdateExpense
};


export type MutationUpdateFixedCategoryArgs = {
  fixedCategory: UpdateFixedCategory
};


export type MutationUpdateVariableCategoryArgs = {
  variableCategory: UpdateVariableCategory
};

export type Query = {
   __typename?: 'Query',
  expense: Expense,
  expenses: Array<Expense>,
  fixedCategory: FixedCategory,
  fixedCategories: Array<FixedCategory>,
  timePeriod: TimePeriod,
  timePeriods: Array<TimePeriod>,
  variableCategory: VariableCategory,
  variableCategories: Array<VariableCategory>,
};


export type QueryExpenseArgs = {
  userId: Scalars['String'],
  expenseId: Scalars['String']
};


export type QueryExpensesArgs = {
  userId: Scalars['String'],
  variableCategoryId?: Maybe<Scalars['String']>,
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryFixedCategoryArgs = {
  userId: Scalars['String'],
  fixedCategoryId: Scalars['String']
};


export type QueryFixedCategoriesArgs = {
  userId: Scalars['String'],
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryTimePeriodArgs = {
  userId: Scalars['String'],
  timePeriodId: Scalars['String']
};


export type QueryTimePeriodsArgs = {
  userId: Scalars['String'],
  date?: Maybe<Scalars['String']>
};


export type QueryVariableCategoryArgs = {
  userId: Scalars['String'],
  variableCategoryId: Scalars['String']
};


export type QueryVariableCategoriesArgs = {
  userId: Scalars['String'],
  timePeriodId?: Maybe<Scalars['String']>
};

export type TimePeriod = {
   __typename?: 'TimePeriod',
  timePeriodId: Scalars['ID'],
  beginDate: Scalars['String'],
  endDate: Scalars['String'],
  userId: Scalars['String'],
  fixedCategories: Array<FixedCategory>,
  variableCategories: Array<VariableCategory>,
  expenses: Array<Expense>,
};

export type UpdateExpense = {
  expenseId: Scalars['String'],
  userId: Scalars['String'],
  amount?: Maybe<Scalars['Float']>,
  date?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  variableCategoryId?: Maybe<Scalars['String']>,
};

export type UpdateFixedCategory = {
  fixedCategoryId: Scalars['String'],
  userId: Scalars['String'],
  amount?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
  paid?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['String']>,
};

export type UpdateVariableCategory = {
  variableCategoryId: Scalars['String'],
  userId: Scalars['String'],
  amount?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};


export type VariableCategory = {
   __typename?: 'VariableCategory',
  variableCategoryId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  expenses: Array<Expense>,
};
