import { Expense } from '../../finances/models/expense.model';import { Income } from '../../finances/models/income.model';export interface User {  email: string;  password: string;  expenses?: Array<Expense>;  incomes?: Array<Income>;  isAdmin?: boolean;  _id?: string;  iat?: number;}