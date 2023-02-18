import { BudgetAssignmentListRes, BudgetOverviewRes } from './backend';

export type BudgetOverviewItem = BudgetOverviewRes[0];

export type BudgetAssignmentList = BudgetAssignmentListRes;
export type BudgetAssignmentItem = BudgetAssignmentList['items'][0];
