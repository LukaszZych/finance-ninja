import * as fromAuth from '../actions/auth.actions';// interfejs tylko dla tej części stanu w tym moduleexport interface AuthState {  token: string;  isAuthenticated: boolean;  loading: boolean;}const initialState: AuthState = {  token: '',  isAuthenticated: false,  loading: false};export function authReducer(state: AuthState = initialState, action: fromAuth.AuthActions) {  switch (action.type) {    case fromAuth.LOG_IN: return { ...state, loading: true };    case fromAuth.LOG_IN_FAIL: return { ...state, isAuthenticated: false, loading: false };    case fromAuth.LOG_IN_SUCCESS: return { token: action.payload, isAuthenticated: true, loading: false };    case fromAuth.LOG_OUT: return { token: '', isAuthenticated: false, loading: false };    default: { return state; }  }}