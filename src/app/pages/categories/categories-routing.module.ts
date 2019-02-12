import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/cotegory-list.component';

const routes: Routes = [
  {path: "", component: CategoryListComponent},
  {path: ":id", component: CategoryFormComponent},
  {path: "new", component: CategoryFormComponent},
  {path: ":id/edit", component: CategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
