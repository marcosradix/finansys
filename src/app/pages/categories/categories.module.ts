import { NgModule } from '@angular/core';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/cotegory-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    CategoriesRoutingModule,
  ],
  declarations: [CategoryListComponent, CategoryFormComponent]
})
export class CategoriesModule { }
