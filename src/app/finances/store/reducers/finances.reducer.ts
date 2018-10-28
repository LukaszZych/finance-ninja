import { User } from '../../../authentication/models/user.model';import * as fromUsers from '../actions/user.actions';import * as fromIncomes from '../actions/income.actions';// interfejs tylko dla tej części stanu w tym moduleexport interface FinancesState {  user: User;  loading: boolean;}// inicjalny stan tylko dla tej części stanu w tym moduleexport const initialFinancesState: FinancesState = {  user: {    email: '',    expenses: [],    incomes: [],    isAdmin: false,    _id: ''  },  loading: false};export function financesReducer(state = initialFinancesState, action: fromUsers.UserActions | fromIncomes.IncomeActions): FinancesState {  switch (action.type) {    case fromUsers.LOAD_USER: {      return { ...state, loading: true };    }    case fromUsers.LOAD_USER_SUCCESS: {      return { user: action.payload, loading: false };    }    case fromUsers.LOAD_USER_FAIL: {      return { ...state, loading: false };    }    case fromIncomes.ADD_INCOME: {      return {        ...state, user: {          ...state.user, incomes: [...state.user.incomes, action.income]        }      };    }    case fromIncomes.REMOVE_INCOME: {      return {        ...state, user:          {            ...state.user, incomes: state.user.incomes.filter((income) => {              return income._id !== action.incomeId;            })          }      };    }    default:      return state;  }}// funkcje które zwracają części / propertki z tego stanu, będą przydatne do selectorówexport const getFinancesUser = (state: FinancesState) => state.user;export const getFinancesUserExpenses = (state: FinancesState) => state.user.expenses;export const getFinancesUserIncomes = (state: FinancesState) => state.user.incomes;export const getFinancesLoading = (state: FinancesState) => state.loading;