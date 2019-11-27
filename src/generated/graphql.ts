export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
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
  fixedCategoryId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  paid: Scalars['Boolean'],
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
};

export type ExpenseInput = {
  variableCategoryId?: Maybe<Scalars['String']>,
  timePeriodId?: Maybe<Scalars['String']>,
};

export type FixedCategory = {
   __typename?: 'FixedCategory',
  fixedCategoryId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  paid: Scalars['Boolean'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createExpense: Expense,
  createFixedCategory: FixedCategory,
  createTimePeriod: TimePeriod,
  createVariableCategory: VariableCategory,
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

export type Query = {
   __typename?: 'Query',
  expenses: Array<Expense>,
  fixedCategories: Array<FixedCategory>,
  timePeriods: Array<TimePeriod>,
  variableCategories: Array<VariableCategory>,
};


export type QueryExpensesArgs = {
  userId: Scalars['String'],
  variableCategoryId?: Maybe<Scalars['String']>,
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryFixedCategoriesArgs = {
  userId: Scalars['String'],
  fixedCategoryId?: Maybe<Scalars['String']>,
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryTimePeriodsArgs = {
  userId: Scalars['String'],
  date?: Maybe<Scalars['String']>
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


export type VariableCategory = {
   __typename?: 'VariableCategory',
  variableCategoryId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  expenses: Array<Expense>,
};
