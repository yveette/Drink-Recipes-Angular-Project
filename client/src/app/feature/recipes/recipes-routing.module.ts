import { RouterModule, Routes } from "@angular/router";
import { RecipesPageComponent } from "./recipes-page/recipes-page.component";

const routes: Routes = [
    {
        path: 'recipes',
        component: RecipesPageComponent,
    }
]

export const RecipesRoutingModule = RouterModule.forChild(routes);