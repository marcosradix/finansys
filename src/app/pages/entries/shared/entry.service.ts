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

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleErro),
          map(this.jsonDataToResource)
        );
      }
      )
    );

  }

  updateEntry(entry: EntryModel): Observable<EntryModel> {
    const url = `${this.apiPath}/${entry.id}`;
   return this.categoryService.getResourceById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;
        
        return this.http.put(url, entry).pipe(
          catchError(this.handleErro),
          map(() => entry));
      })
    );

  }



  protected  jsonDataToResource(jsonData: any): EntryModel {
    return Object.assign(new EntryModel, jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): EntryModel[] {
    const entries: Array<EntryModel> = [];
    jsonData.forEach(element => entries.push(Object.assign(new EntryModel(), element)));
    return entries;
  }

}
