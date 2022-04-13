import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/core/interfaces";

const profileDomain = '[ProfileComponent]';
export const profileLoaded = createAction(`${profileDomain} Profile Loaded`,
    props<{ profile: IUser }>()
)

export const enterEditMode = createAction(`${profileDomain} Enter Edit Mode`);
export const exitEditMode = createAction(`${profileDomain} Exit Edit Mode`);
