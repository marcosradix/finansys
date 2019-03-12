import { CategoryModel } from './../shared/category.model';
import { Component, Injector } from '@angular/core';
import { Validators as valid } from "@angular/forms";

import { CategoryModel as Category } from "../shared/category.model";
import { CategoryService } from './../shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<CategoryModel>{


  constructor(
    protected categoryService: CategoryService,
    protected injector: Injector) {
    super(injector, new CategoryModel(), categoryService, CategoryModel.fromJson);
  }


  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [valid.required, valid.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de nova categoria";
  }
  protected editionPageTitle(): string {
    return   `Edição de categoria:  ${this.resource.name || ""}`;
  }
}
