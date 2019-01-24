import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotegoryListComponent } from './cotegory-list/cotegory-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

const routes: Routes = [
  {path: "", component: CotegoryListComponent},
  {path: ":id", component: CategoryFormComponent},
  {path: "new", component: CategoryFormComponent},
  {path: ":id/edit", component: CategoryFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
