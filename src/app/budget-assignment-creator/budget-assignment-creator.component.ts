import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Account, BudgetCategory } from 'src/types';
import { notEmpty } from 'src/util';
import { ChingBackendService } from '../ching-backend.service';

type MonthBudget = {
  year: number;
  month: number;
};

type MonthOption = {
  monthBudget: MonthBudget;
  title: string;
};

interface BudgetAssignmentForm {
  category: FormControl<BudgetCategory | null>;
  amount: FormControl<number>;
}

@Component({
  selector: 'app-budget-assignment-creator',
  templateUrl: './budget-assignment-creator.component.html',
  styleUrls: ['./budget-assignment-creator.component.scss'],
})
export class BudgetAssignmentCreatorComponent {
  createForm = this.fb.group({
    date: this.fb.control(new Date(), Validators.required),
    recipient: this.fb.control('', Validators.required),
    selectedAccount: this.fb.control<Account | null>(null, Validators.required),
    selectedMonth: this.fb.control<MonthOption | null>(
      null,
      Validators.required
    ),
    budgetAssignments: this.fb.array([
      this.fb.group<BudgetAssignmentForm>({
        amount: this.fb.control(0, {
          validators: [Validators.required, Validators.min(1)],
          nonNullable: true,
        }),
        category: this.fb.control<BudgetCategory | null>(
          null,
          Validators.required
        ),
      }),
    ]),
  });

  accounts: Account[] = [];
  budgetCategories: BudgetCategory[] = [];

  monthOptions: MonthOption[] = [];
  filteredBudgetCategories: Record<number, BudgetCategory[]> = {};

  constructor(
    private backend: ChingBackendService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.populateMonthOptions();
    this.getAccounts();
    this.getBudgetCategories();
  }

  getAccounts(): void {
    this.backend
      .getAccounts()
      .subscribe((accounts) => (this.accounts = accounts));
  }

  getBudgetCategories(): void {
    this.backend
      .getBudgetCategories()
      .subscribe((categories) => (this.budgetCategories = categories));
  }

  getAssignmentsTotal(): number {
    return this.budgetAssignments.controls
      .map((c) => c.value.amount)
      .filter(notEmpty)
      .reduce((v1, v2) => v1 + v2);
  }

  addBudgetAssignment() {
    this.budgetAssignments.push(
      this.fb.group({
        amount: this.fb.control(0, {
          validators: [Validators.required, Validators.min(1)],
          nonNullable: true,
        }),
        category: this.fb.control<BudgetCategory | null>(
          null,
          Validators.required
        ),
      })
    );
  }

  removeBudgetAssignment(i: number) {
    if (this.budgetAssignments.length === 1) {
      this.messageService.add({
        severity: 'warn',
        detail: 'Cannot remove last budget assignment',
      });
      return;
    }

    this.budgetAssignments.removeAt(i);
  }

  onSubmit(): void {
    if (!this.createForm.valid) {
      return;
    }

    this.messageService.add({ severity: 'success', detail: 'Submitted' });
  }

  get budgetAssignments() {
    return this.createForm.get('budgetAssignments') as FormArray<
      FormGroup<BudgetAssignmentForm>
    >;
  }

  search(i: number, event: any): void {
    let filtered: any[] = [];
    let query = event.query;

    const alreadySelected = this.budgetAssignments.controls
      .map((c) => c.value.category?.name)
      .filter(notEmpty);

    for (let i = 0; i < this.budgetCategories.length; i++) {
      const category = this.budgetCategories[i];

      if (alreadySelected.includes(category.name)) {
        continue;
      }

      if (category.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(category);
      }
    }

    this.filteredBudgetCategories[i] = filtered;
  }

  populateMonthOptions(): void {
    const thisMonth = new Date();
    const prevMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() - 1,
      thisMonth.getDate()
    );
    const nextMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() + 1,
      thisMonth.getDate()
    );

    this.monthOptions = [prevMonth, thisMonth, nextMonth].map((m) => ({
      monthBudget: {
        year: m.getFullYear(),
        month: m.getMonth(),
      },
      title: m.toLocaleDateString('default', { month: 'long' }),
    }));
    this.createForm.patchValue({ selectedMonth: this.monthOptions[1] });
  }
}
