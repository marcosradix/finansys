import { flatMap ,map, catchError} from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './model/entry.model';
import { Injectable , Injector} from '@angular/core';
import { Observable } from "rxjs";




@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<EntryModel>{

  constructor(protected injector: Injector,
              private categoryService: CategoryService) { 
    super(injector, "api/entries");
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



  protected  jsonDataToResource(jsonData: any): EntryModel {
    return EntryModel.fromJson(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): EntryModel[] {
    const entries: Array<EntryModel> = [];
    jsonData.forEach(element => entries.push(EntryModel.fromJson(element)));
    return entries;
  }

}
