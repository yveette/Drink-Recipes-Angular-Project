import { createReducer, on } from "@ngrx/store";
import { ILoginPageState, IProfilePageState } from ".";
import { enterEditMode, exitEditMode, initializeLoginState, loginProcessError, profileLoaded, startLoginProcess } from "./actions";

export const profileReducer = createReducer<IProfilePageState>(
    {
        currentProfile: undefined,
        isInEditMode: false,
    },
    on(profileLoaded, (state, action) => {
        return {
            ...state,
            currentProfile: action.profile
        }
    }),
    on(enterEditMode, (state) => {
        return {
            ...state,
            isInEditMode: true,
        }
    }),
    on(exitEditMode, (state) => {
        return {
            ...state,
            isInEditMode: false,
        }
    })
)

const loginInitialState = {
    errorMessage: '',
    isLoginPending: false,
};

export const loginReducer = createReducer<ILoginPageState>(
    loginInitialState,
    on(startLoginProcess, (state) => {
        return {
            ...state,
            isLoginPending: true,
            errorMessage: ''
        }
    }),
    on(loginProcessError, (state, action) => {
        return {
            ...state,
            isLoginPending: false,
            errorMessage: action.errorMessage
        }
    }),
    on(initializeLoginState, (state,) => {
        return loginInitialState;
    }),
)