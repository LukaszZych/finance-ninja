import * as fromAuth from '../actions/auth.actions';// interfejs tylko dla tej części stanu w tym moduleexport interface AuthState {  token: string;  isAdmin: boolean;  loading: boolean;}const initialState: AuthState = {  token: '',  isAdmin: false,  loading: false};export function authReducer(state: AuthState = initialState, action: fromAuth.AuthActions) {  switch (action.type) {    case fromAuth.LOG_IN: return { ...state, isAdmin: false, loading: true };    case fromAuth.LOG_IN_FAIL: return { ...state, isAdmin: false, loading: false };    case fromAuth.LOG_IN_SUCCESS: return { token: action.token, isAdmin: false, loading: false };    case fromAuth.SIGN_IN: return { ...state, isAdmin: false, loading: true };    case fromAuth.SIGN_IN_FAIL: return { ...state, isAdmin: false, loading: false };    case fromAuth.SIGN_IN_SUCCESS: return { token: action.token, isAdmin: false, loading: false };    case fromAuth.LOG_OUT: return { token: '', isAdmin: false, loading: false };    default: { return state; }  }}