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
  amount: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
};

export type CreateVariableCategory = {
  variableCategoryId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
};

export type Expense = {
   __typename?: 'Expense',
  expenseId: Scalars['ID'],
  userId: Scalars['String'],
  variableCategoryId: Scalars['String'],
  amount: Scalars['Int'],
  name?: Maybe<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createVariableCategory: VariableCategory,
  createExpense: Expense,
};


export type MutationCreateVariableCategoryArgs = {
  variableCategory: CreateVariableCategory
};


export type MutationCreateExpenseArgs = {
  expense: CreateExpense
};

export type Query = {
   __typename?: 'Query',
  expenses: Array<Expense>,
  variableCategories: Array<VariableCategory>,
};


export type QueryExpensesArgs = {
  userId: Scalars['String'],
  variableCategoryId?: Maybe<Scalars['String']>
};


export type QueryVariableCategoriesArgs = {
  userId: Scalars['String']
};


export type VariableCategory = {
   __typename?: 'VariableCategory',
  variableCategoryId: Scalars['ID'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
};
