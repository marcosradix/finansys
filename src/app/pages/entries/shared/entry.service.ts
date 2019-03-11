import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './model/entry.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath: string = "api/entries"

  constructor(private http: HttpClient,
    private categoryService: CategoryService) { }

  getAll(): Observable<Array<EntryModel>> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToEntries)
    );
  }


  getEntryById(id: number): Observable<EntryModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToEntry)
    );
  }

  createEntry(entry: EntryModel): Observable<EntryModel> {
    return this.categoryService.getResourceById(entry.categoryId).pipe(
      flatMap(cat => {
        entry.category = cat;

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleErro),
          map(this.jsonDataToEntry)
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

  deleteEntry(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleErro),
      map(() => null)
    );
  }

  jsonDataToEntry(jsonData: any): EntryModel {
    return Object.assign(new EntryModel, jsonData);
  }

  private jsonDataToEntries(jsonData: any[]): EntryModel[] {
    const entries: Array<EntryModel> = [];
    jsonData.forEach(element => entries.push(Object.assign(new EntryModel(), element)));
    return entries;
  }
  private handleErro(erro: any): Observable<any> {
    console.log("Erro na requisição => ", erro);
    return throwError(erro);
  }
}
