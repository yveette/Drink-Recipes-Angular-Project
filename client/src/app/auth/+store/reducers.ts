import { createReducer, on } from "@ngrx/store";
import { ILoginPageState, IProfilePageState } from ".";
import { enterEditMode, exitEditMode, profileLoaded } from "./actions";

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

export const loginReducer = createReducer<ILoginPageState>(
    undefined
)