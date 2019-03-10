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

  constructor(private http: HttpClient) { }

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
    return this.http.post(this.apiPath, entry).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToEntry)
    );
  }


  updateEntry(entry: EntryModel): Observable<EntryModel> {
    const url = `${this.apiPath}/${entry.id}`;
    return this.http.put(url, entry).pipe(
      catchError(this.handleErro),
      map(() => entry)
    );
  }

  deleteEntry(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleErro),
      map(() => null)
    );
  }

  jsonDataToEntry(jsonData: any): EntryModel {
    return jsonData as EntryModel;
  }

  private jsonDataToEntries(jsonData: any[]): EntryModel[] {
    const entries: EntryModel[] = [];
    jsonData.forEach(element => entries.push(element as EntryModel));
    return entries;
  }
  private handleErro(erro: any): Observable<any> {
    console.log("Erro na requisição => ", erro);
    return throwError(erro);
  }
}
