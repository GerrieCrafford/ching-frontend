import { operations } from 'src/backend-gen';

export type BudgetOverview =
  operations['GetBudgetOverview']['responses'][200]['content']['application/json'];
