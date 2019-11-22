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

export type CreateVariableCategory = {
  variableCategoryId: Scalars['String'],
  userId: Scalars['String'],
  amount: Scalars['Int'],
  name: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createVariableCategory?: Maybe<VariableCategory>,
};


export type MutationCreateVariableCategoryArgs = {
  variableCategory: CreateVariableCategory
};

export type Query = {
   __typename?: 'Query',
  variableCategories?: Maybe<Array<VariableCategory>>,
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
