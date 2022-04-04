import { RouterModule, Routes } from "@angular/router";
import { RecipesDetailPageComponent } from "./recipes-detail-page/recipes-detail-page.component";
import { RecipesPageComponent } from "./recipes-page/recipes-page.component";

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesPageComponent,
    },
    {
        path: 'recipes/:recipeId',
        component: RecipesDetailPageComponent,
    }
]

export const RecipesRoutingModule = RouterModule.forChild(routes);