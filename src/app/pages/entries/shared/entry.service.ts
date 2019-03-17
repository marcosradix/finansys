import { flatMap, map, catchError } from 'rxjs/operators';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './model/entry.model';
import { Injectable, Injector } from '@angular/core';
import { Observable } from "rxjs";
import * as moment from "moment";


const urlApi: string = "api/entries";
@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<EntryModel>{
  getByMonthAndYear(month: number, year: number): Observable<Array<EntryModel>> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private filterByMonthAndYear(entries: Array<EntryModel>, month: number, year: number) {
    return entries.filter(entry =>{
      const  entryDate = moment(entry.date, "DD/MM/YYYY");
      const monthMaches = entryDate.month() + 1 == month;
      const yearMaches = entryDate.year() == year;
      if(monthMaches && yearMaches){
        return entry;
      }
    });
  }


  constructor(
    protected injector: Injector,
    private categoryService: CategoryService
  ) {
    super(injector, urlApi, EntryModel.fromJson);
  }


  createResource(entry: EntryModel): Observable<EntryModel> {
    return this.setCategoryAndSendToServer(entry, super.createResource.bind(this));
  }
  updateResource(entry: EntryModel): Observable<EntryModel> {
    return this.setCategoryAndSendToServer(entry, super.updateResource.bind(this));
  }

  private setCategoryAndSendToServer(entry: EntryModel, sendFunc: any): Observable<EntryModel>{
    return this.categoryService.getResourceById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;
        return sendFunc(entry);
      }),  catchError(this.handleErro)
  )
  }

}
