import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{
    // recebe um json e retorna a entidade  protected jsonDataToResourceFn: (jsonData) => T
    protected http: HttpClient;
    constructor(
        protected injector: Injector,
        protected apiPath: string,
        protected jsonDataToResourceFn: (jsonData : any) => T
        ) { 
        this.http = injector.get(HttpClient);
    }

     getAll(): Observable<Array<T>> {
        return this.http.get(this.apiPath).pipe(
            map(this.jsonDataToResources.bind(this)),
            catchError(this.handleErro)
           
        );
    }


     getResourceById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleErro)
        );
    }

     createResource(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            map(this.jsonDataToResource.bind(this)),
            catchError(this.handleErro)
        );
    }

     updateResource(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            map(() => resource),
            catchError(this.handleErro)
        );
    }

     deleteResource(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            map(() => null),
            catchError(this.handleErro)
        );
    }

    
  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(  this.jsonDataToResourceFn(element) ));
    return resources;
  }
  protected handleErro(erro: any): Observable<any> {
    console.log("Erro na requisição => ", erro);
    return throwError(erro);
  }
}