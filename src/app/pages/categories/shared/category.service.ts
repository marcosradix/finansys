import { CategoryModel } from './category.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseResourceService<CategoryModel>{
  constructor(protected injector: Injector) {
    super(injector, "api/categorias");
  }

}
