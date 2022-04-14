import { Injectable } from "@angular/core";
import { Actions, createEffect } from "@ngrx/effects";
import { catchError, filter, map, mergeMap, of } from "rxjs";
import { UserService } from "src/app/core/user.service";
import { profileLoaded, profileLoadError, profilePageInitialize } from "./actions";

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService
    ) { }

    onProfilePageLoaded$ = createEffect(() =>
        this.actions$.pipe(
            filter(a => a.type === profilePageInitialize().type),
            mergeMap(() => this.userService.getProfile$()),
            map(currentProfile => profileLoaded({ profile: currentProfile })),
            catchError(() => of(profileLoadError()))
        )
    )
}