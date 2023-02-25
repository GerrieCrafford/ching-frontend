import { operations } from 'src/backend-gen';

export type BudgetOverviewRes =
  operations['GetBudgetOverview']['responses'][200]['content']['application/json'];

export type BudgetAssignmentListRes =
  operations['GetBudgetAssignmentList']['responses'][200]['content']['application/json'];

export type AccountListRes =
  operations['GetAccounts']['responses'][200]['content']['application/json'];

export type BudgetCategoryListRes =
  operations['GetBudgetCategoryList']['responses'][200]['content']['application/json'];

export type CreateFromBudgetAssignmentsBody =
  operations['CreateAccountTransactionFromAssignments']['requestBody']['content']['application/json'];
export type CreateFromBudgetAssignmentsRes =
  operations['CreateAccountTransactionFromAssignments']['responses'][200]['content']['application/json'];
