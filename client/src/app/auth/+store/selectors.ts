import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from ".";

export const authSelector = createFeatureSelector<IAuthState>('auth');
export const loginErrorMessageSelector = createSelector(authSelector, (authState) => {
    return authState.login.errorMessage
});
export const loginPendingSelector = createSelector(authSelector, (authState) => {
    return authState.login.isLoginPending
});