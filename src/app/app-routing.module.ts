import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-detail/recipe-edit/recipe-edit.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { EntryComponent } from './entry/entry.component';
import { RecipesResolver } from './recipes/recipes.resolver';
import { AuthenticationGuard } from './authentication/authentication.guard';


const routes: Routes = [
  {path: '', component: EntryComponent},
  {path: 'authentication', component: AuthenticationComponent},
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthenticationGuard],
    resolve: {
      recipes: RecipesResolver
    },
    children: [
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ]
  },
  {path: 'shopping', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
