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

export type CreateDebtCategory = {
  debtCategoryId: Scalars['String'],
  userId: Scalars['String'],
  name: Scalars['String'],
};

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

export type CreateIncomeItem = {
  incomeItemId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  recurring: Scalars['Boolean'],
  name: Scalars['String'],
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

export type DebtCategory = {
   __typename?: 'DebtCategory',
  debtCategoryId: Scalars['ID'],
  userId: Scalars['String'],
  name: Scalars['String'],
  amount: Scalars['Int'],
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

export type IncomeItem = {
   __typename?: 'IncomeItem',
  incomeItemId: Scalars['ID'],
  timePeriodId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  recurring: Scalars['Boolean'],
  name: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createDebtCategory: DebtCategory,
  createExpense: Expense,
  createFixedCategory: FixedCategory,
  createIncomeItem: IncomeItem,
  createSavingCategory: SavingCategory,
  createTimePeriod: TimePeriod,
  createVariableCategory: VariableCategory,
  deleteDebtCategory: Scalars['String'],
  deleteExpense: Scalars['String'],
  deleteFixedCategory: Scalars['String'],
  deleteIncomeItem: Scalars['String'],
  deleteSavingCategory: Scalars['String'],
  deleteTimePeriod: Scalars['String'],
  deleteVariableCategory: Scalars['String'],
  updateDebtCategory: DebtCategory,
  updateExpense: Expense,
  updateFixedCategory: FixedCategory,
  updateIncomeItem: IncomeItem,
  updateSavingCategory: SavingCategory,
  updateTimePeriod: TimePeriod,
  updateVariableCategory: VariableCategory,
};


export type MutationCreateDebtCategoryArgs = {
  debtCategory: CreateDebtCategory
};


export type MutationCreateExpenseArgs = {
  expense: CreateExpense
};


export type MutationCreateFixedCategoryArgs = {
  fixedCategory: CreateFixedCategory
};


export type MutationCreateIncomeItemArgs = {
  incomeItem: CreateIncomeItem
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


export type MutationDeleteDebtCategoryArgs = {
  userId: Scalars['String'],
  debtCategoryId: Scalars['String']
};


export type MutationDeleteExpenseArgs = {
  userId: Scalars['String'],
  expenseId: Scalars['String']
};


export type MutationDeleteFixedCategoryArgs = {
  userId: Scalars['String'],
  fixedCategoryId: Scalars['String']
};


export type MutationDeleteIncomeItemArgs = {
  userId: Scalars['String'],
  incomeItemId: Scalars['String']
};


export type MutationDeleteSavingCategoryArgs = {
  userId: Scalars['String'],
  savingCategoryId: Scalars['String']
};


export type MutationDeleteTimePeriodArgs = {
  userId: Scalars['String'],
  timePeriodId: Scalars['String']
};


export type MutationDeleteVariableCategoryArgs = {
  userId: Scalars['String'],
  variableCategoryId: Scalars['String']
};


export type MutationUpdateDebtCategoryArgs = {
  debtCategory: UpdateDebtCategory
};


export type MutationUpdateExpenseArgs = {
  expense: UpdateExpense
};


export type MutationUpdateFixedCategoryArgs = {
  fixedCategory: UpdateFixedCategory
};


export type MutationUpdateIncomeItemArgs = {
  incomeItem: UpdateIncomeItem
};


export type MutationUpdateSavingCategoryArgs = {
  savingCategory: UpdateSavingCategory
};


export type MutationUpdateTimePeriodArgs = {
  timePeriod: UpdateTimePeriod
};


export type MutationUpdateVariableCategoryArgs = {
  variableCategory: UpdateVariableCategory
};

export type Query = {
   __typename?: 'Query',
  debtCategories: Array<DebtCategory>,
  debtCategory: DebtCategory,
  expense: Expense,
  expenses: Array<Expense>,
  fixedCategories: Array<FixedCategory>,
  fixedCategory: FixedCategory,
  incomeItem: IncomeItem,
  incomeItems: Array<IncomeItem>,
  savingCategories: Array<SavingCategory>,
  savingCategory: SavingCategory,
  timePeriod: TimePeriod,
  timePeriods: Array<TimePeriod>,
  variableCategories: Array<VariableCategory>,
  variableCategory: VariableCategory,
};


export type QueryDebtCategoriesArgs = {
  userId: Scalars['String']
};


export type QueryDebtCategoryArgs = {
  userId: Scalars['String'],
  debtCategoryId: Scalars['String']
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


export type QueryIncomeItemArgs = {
  userId: Scalars['String'],
  incomeItemId: Scalars['String']
};


export type QueryIncomeItemsArgs = {
  userId: Scalars['String'],
  timePeriodId?: Maybe<Scalars['String']>
};


export type QuerySavingCategoriesArgs = {
  userId: Scalars['String']
};


export type QuerySavingCategoryArgs = {
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

export type SavingCategory = {
   __typename?: 'SavingCategory',
  savingCategoryId: Scalars['ID'],
  userId: Scalars['String'],
  name: Scalars['String'],
  amount: Scalars['Int'],
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

export type UpdateDebtCategory = {
  debtCategoryId: Scalars['String'],
  userId: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Int']>,
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

export type UpdateIncomeItem = {
  incomeItemId: Scalars['ID'],
  userId: Scalars['String'],
  amount?: Maybe<Scalars['Int']>,
  recurring?: Maybe<Scalars['Boolean']>,
  name?: Maybe<Scalars['String']>,
};

export type UpdateSavingCategory = {
  savingCategoryId: Scalars['String'],
  userId: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  amount?: Maybe<Scalars['Int']>,
};

export type UpdateTimePeriod = {
  timePeriodId: Scalars['String'],
  beginDate?: Maybe<Scalars['String']>,
  endDate?: Maybe<Scalars['String']>,
  userId: Scalars['String'],
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
