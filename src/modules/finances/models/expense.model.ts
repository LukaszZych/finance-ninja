import { Category } from './category.model';export interface Expense {  value: number;  category: Category;  description?: string;  date?: string;  _id?: string;}