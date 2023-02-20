import {
  AccountListRes,
  BudgetAssignmentListRes,
  BudgetCategoryListRes,
  BudgetOverviewRes,
} from './backend';

export type BudgetOverviewItem = BudgetOverviewRes[0];

export type BudgetAssignmentList = BudgetAssignmentListRes;
export type BudgetAssignmentItem = BudgetAssignmentList['items'][0];

export type Account = AccountListRes[0];
export type AccountPartition = Account['partitions'][0];

export type BudgetCategory = BudgetCategoryListRes[0];
