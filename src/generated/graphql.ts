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
  fixedCategoryId: Scalars['String'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
  paid: Scalars['Boolean'],
  note?: Maybe<Scalars['String']>,
};

export type CreateSaving = {
  savingId: Scalars['String'],
  userId: Scalars['String'],
  savingCategoryId: Scalars['String'],
  amount: Scalars['Float'],
  date: Scalars['String'],
  name?: Maybe<Scalars['String']>,
};

export type CreateSavingCategory = {
  savingCategoryId: Scalars['String'],
  userId: Scalars['String'],
  name: Scalars['String'],
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
  createSaving: Saving,
  createSavingCategory: SavingCategory,
  createTimePeriod: TimePeriod,
  createVariableCategory: VariableCategory,
  deleteExpense: Scalars['String'],
  deleteFixedCategory: Scalars['String'],
  deleteSaving: Scalars['String'],
  deleteSavingCategory: Scalars['String'],
  deleteVariableCategory: Scalars['String'],
  updateExpense: Expense,
  updateFixedCategory: FixedCategory,
  updateSaving: Saving,
  updateSavingCategory: SavingCategory,
  updateVariableCategory: VariableCategory,
};


export type MutationCreateExpenseArgs = {
  expense: CreateExpense
};


export type MutationCreateFixedCategoryArgs = {
  fixedCategory: CreateFixedCategory
};


export type MutationCreateSavingArgs = {
  saving: CreateSaving
};


export type MutationCreateSavingCategoryArgs = {
  savingCategory: CreateSavingCategory
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


export type MutationDeleteSavingArgs = {
  userId: Scalars['String'],
  savingId: Scalars['String']
};


export type MutationDeleteSavingCategoryArgs = {
  userId: Scalars['String'],
  savingCategoryId: Scalars['String']
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


export type MutationUpdateSavingArgs = {
  saving: UpdateSaving
};


export type MutationUpdateSavingCategoryArgs = {
  savingCategory: UpdateSavingCategory
};


export type MutationUpdateVariableCategoryArgs = {
  variableCategory: UpdateVariableCategory
};

export type Query = {
   __typename?: 'Query',
  expense: Expense,
  expenses: Array<Expense>,
  fixedCategories: Array<FixedCategory>,
  fixedCategory: FixedCategory,
  saving: Saving,
  savingCategories: Array<SavingCategory>,
  savingCategory: SavingCategory,
  savings: Array<Saving>,
  timePeriod: TimePeriod,
  timePeriods: Array<TimePeriod>,
  variableCategories: Array<VariableCategory>,
  variableCategory: VariableCategory,
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


export type QueryFixedCategoriesArgs = {
  userId: Scalars['String'],
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryFixedCategoryArgs = {
  userId: Scalars['String'],
  fixedCategoryId: Scalars['String']
};


export type QuerySavingArgs = {
  userId: Scalars['String'],
  savingId: Scalars['String']
};


export type QuerySavingCategoriesArgs = {
  userId: Scalars['String']
};


export type QuerySavingCategoryArgs = {
  userId: Scalars['String'],
  savingCategoryId: Scalars['String']
};


export type QuerySavingsArgs = {
  userId: Scalars['String'],
  savingCategoryId: Scalars['String']
};


export type QueryTimePeriodArgs = {
  userId: Scalars['String'],
  timePeriodId: Scalars['String']
};


export type QueryTimePeriodsArgs = {
  userId: Scalars['String'],
  date?: Maybe<Scalars['String']>
};


export type QueryVariableCategoriesArgs = {
  userId: Scalars['String'],
  timePeriodId?: Maybe<Scalars['String']>
};


export type QueryVariableCategoryArgs = {
  userId: Scalars['String'],
  variableCategoryId: Scalars['String']
};

export type Saving = {
   __typename?: 'Saving',
  savingId: Scalars['ID'],
  userId: Scalars['String'],
  savingCategoryId: Scalars['String'],
  amount: Scalars['Float'],
  date: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  saving: SavingCategory,
};

export type SavingCategory = {
   __typename?: 'SavingCategory',
  savingCategoryId: Scalars['ID'],
  userId: Scalars['String'],
  name: Scalars['String'],
  savings: Array<Saving>,
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

export type UpdateSaving = {
  savingId: Scalars['String'],
  userId: Scalars['String'],
  savingCategoryId?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Float']>,
  date?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type UpdateSavingCategory = {
  savingCategoryId: Scalars['String'],
  userId: Scalars['String'],
  name?: Maybe<Scalars['String']>,
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
