import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Account, AccountPartition, BudgetCategory } from 'src/types';
import { notEmpty } from 'src/util';
import { ChingBackendService } from '../ching-backend.service';

type BudgetMonth = {
  year: number;
  month: number;
};

type MonthOption = {
  budgetMonth: BudgetMonth;
  title: string;
};

interface BudgetAssignmentForm {
  category: FormControl<BudgetCategory | null>;
  amount: FormControl<number>;
}

interface BudgetAssignmentValue {
  category: BudgetCategory;
  amount: number;
}

interface CreateForm {
  date: FormControl<Date>;
  recipient: FormControl<string>;
  selectedAccount: FormControl<Account | null>;
  selectedPartition: FormControl<AccountPartition | null>;
  selectedMonth: FormControl<MonthOption | null>;
  budgetAssignments: FormArray<FormGroup<BudgetAssignmentForm>>;
}

interface CreateValue {
  date: Date;
  recipient: string;
  selectedAccount: Account;
  selectedPartition: AccountPartition;
  selectedMonth: MonthOption;
  budgetAssignments: BudgetAssignmentValue[];
}

function getFormValue(form: FormGroup<CreateForm>): CreateValue | null {
  if (!form.valid) return null;

  return form.value as CreateValue;
}

@Component({
  selector: 'app-budget-assignment-creator',
  templateUrl: './budget-assignment-creator.component.html',
  styleUrls: ['./budget-assignment-creator.component.scss'],
})
export class BudgetAssignmentCreatorComponent {
  createForm = this.fb.group<CreateForm>({
    date: this.fb.control(new Date(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
    recipient: this.fb.control('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    selectedAccount: this.fb.control<Account | null>(null, Validators.required),
    selectedPartition: this.fb.control<AccountPartition | null>(
      null,
      Validators.required
    ),
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

  get partitionOptions(): AccountPartition[] {
    if (!this.createForm.controls.selectedAccount.value) return [];

    return this.createForm.controls.selectedAccount.value.partitions;
  }

  accountSelectionChanged() {
    if (!this.createForm.controls.selectedAccount.value) {
      this.createForm.controls.selectedPartition.setValue(null);
      return;
    }

    this.createForm.controls.selectedPartition.setValue(
      this.createForm.controls.selectedAccount.value.partitions[0]
    );
  }

  onSubmit(): void {
    const formValue = getFormValue(this.createForm);
    if (!formValue) {
      return;
    }

    const req = {
      accountPartitionId: formValue.selectedPartition.id,
      date: formValue.date,
      recipient: formValue.recipient,
      budgetAssignments: formValue.budgetAssignments.map((v) => ({
        amount: v.amount,
        budgetCategoryId: v.category.id,
        budgetMonth: formValue.selectedMonth.budgetMonth,
      })),
    };

    this.backend.createFromBudgetAssignments(req).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          detail: 'Transaction created',
        });

        this.resetPartially();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          detail: 'Could not create transaction',
        });
      },
    });
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
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    this.monthOptions = [prevMonth, thisMonth, nextMonth].map((m) => ({
      budgetMonth: {
        year: m.getFullYear(),
        month: m.getMonth() + 1,
      },
      title: m.toLocaleDateString('default', { month: 'long' }),
    }));
    this.createForm.patchValue({ selectedMonth: this.monthOptions[1] });
  }

  resetPartially(): void {
    this.createForm.controls.budgetAssignments.controls =
      this.createForm.controls.budgetAssignments.controls.slice(0, 1);
    this.createForm.controls.budgetAssignments.reset();
    this.createForm.controls.recipient.reset();
  }
}
