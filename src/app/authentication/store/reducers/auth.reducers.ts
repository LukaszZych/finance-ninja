import * as fromAuth from '../actions/auth.actions';export interface AuthenticationState {  token: string;  isAdmin: boolean;  loading: boolean;}const initialState: AuthenticationState = {  token: '',  isAdmin: false,  loading: false};export function authenticationReducer(state: AuthenticationState = initialState, action: fromAuth.AuthActions) {  switch (action.type) {    case fromAuth.LOG_IN: return { ...state, isAdmin: false, loading: true };    case fromAuth.LOG_IN_FAIL: return { ...state, isAdmin: false, loading: false };    case fromAuth.LOG_IN_SUCCESS: return { token: action.payload.token, isAdmin: action.payload.isAdmin, loading: false };    case fromAuth.SIGN_IN: return { ...state, isAdmin: false, loading: true };    case fromAuth.SIGN_IN_FAIL: return { ...state, isAdmin: false, loading: false };    case fromAuth.SIGN_IN_SUCCESS: return { token: action.token, isAdmin: false, loading: false };    case fromAuth.LOG_OUT: return { token: '', isAdmin: false, loading: false };    default: { return state; }  }}export const getAuthToken = (state: AuthenticationState) => state.token;export const getAuthIsAdmin = (state: AuthenticationState) => state.isAdmin;export const getAuthLoading = (state: AuthenticationState) => state.loading;