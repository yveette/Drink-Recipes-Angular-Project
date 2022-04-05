import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { RecipesDetailPageComponent } from "./recipes-detail-page/recipes-detail-page.component";
import { RecipesNewPageComponent } from "./recipes-new-page/recipes-new-page.component";
import { RecipesPageComponent } from "./recipes-page/recipes-page.component";

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesPageComponent,
    },
    {
        path: 'recipes/new',
        canActivate: [AuthGuard],
        component: RecipesNewPageComponent,
    },
    {
        path: 'recipes/:recipeId',
        component: RecipesDetailPageComponent,
    }
]

export const RecipesRoutingModule = RouterModule.forChild(routes);