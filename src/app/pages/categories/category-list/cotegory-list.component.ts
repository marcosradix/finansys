import { Component } from '@angular/core';
import { CategoryModel } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-cotegory-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<CategoryModel> {

  constructor(
    protected categoryService: CategoryService,
  ) { 
    super(categoryService);
  }
  
}
