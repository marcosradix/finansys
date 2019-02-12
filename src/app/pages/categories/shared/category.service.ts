import { CategoryModel } from './category.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, flatMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiPath: string = "api/categorias"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<CategoryModel>> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategories)
    );
  }


  getCategoryById(id: number): Observable<CategoryModel> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategory)
    );
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post(this.apiPath, category).pipe(
      catchError(this.handleErro),
      map(this.jsonDataToCategory)
    );
  }


  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    const url = `${this.apiPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handleErro),
      map(() => category)
    );
  }

  deleteCategory(id: number): Observable<any>{
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleErro),
      map(() => null)
    );
  }

  jsonDataToCategory(jsonData: any): CategoryModel {
    return jsonData as CategoryModel;
  }

  private jsonDataToCategories(jsonData: any[]): CategoryModel[] {
    const categories: CategoryModel[] = [];
    jsonData.forEach(element => categories.push(element as CategoryModel));
    return categories;
  }
  private handleErro(erro: any): Observable<any> {
    console.log("Erro na requisição => ", erro);
    return throwError(erro);
  }
}
