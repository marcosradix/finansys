import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CotegoryListComponent } from './cotegory-list/cotegory-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
  declarations: [CotegoryListComponent, CategoryFormComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
