import { flatMap ,map, catchError} from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './model/entry.model';
import { Injectable , Injector} from '@angular/core';
import { Observable } from "rxjs";



const urlApi : string = "api/entries";
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<EntryModel>{

  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
    ) { 
    super(injector, urlApi, EntryModel.fromJson);
  }


  createEntry(entry: EntryModel): Observable<EntryModel> {
    return this.categoryService.getResourceById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;

        return super.createResource(entry);
      }
      )
    );

  }

  updateEntry(entry: EntryModel): Observable<EntryModel> {
   return this.categoryService.getResourceById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;
        
        return super.updateResource(entry);
      })
    );

  }

}
