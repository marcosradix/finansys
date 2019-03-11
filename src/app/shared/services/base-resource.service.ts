import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Injector } from '@angular/core';

export abstract class BaseResourceService<T extends BaseResourceModel>{

    protected http: HttpClient;
    constructor(protected injector: Injector, protected apiPath: string) { 
        this.http = injector.get(HttpClient);
    }

    getAll(): Observable<Array<T>> {
        return this.http.get(this.apiPath).pipe(
            catchError(this.handleErro),
            map(this.jsonDataToResources)
        );
    }


    getResourceById(id: number): Observable<T> {
        const url = `${this.apiPath}/${id}`;
        return this.http.get(url).pipe(
            catchError(this.handleErro),
            map(this.jsonDataToResource)
        );
    }

    createResource(resource: T): Observable<T> {
        return this.http.post(this.apiPath, resource).pipe(
            catchError(this.handleErro),
            map(this.jsonDataToResource)
        );
    }

    updateResource(resource: T): Observable<T> {
        const url = `${this.apiPath}/${resource.id}`;
        return this.http.put(url, resource).pipe(
            catchError(this.handleErro),
            map(() => resource)
        );
    }

    deleteResource(id: number): Observable<any> {
        const url = `${this.apiPath}/${id}`;
        return this.http.delete(url).pipe(
            catchError(this.handleErro),
            map(() => null)
        );
    }

    
  protected jsonDataToResource(jsonData: any): T {
    return jsonData as T;
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(element => resources.push(element as T));
    return resources;
  }
  protected handleErro(erro: any): Observable<any> {
    console.log("Erro na requisição => ", erro);
    return throwError(erro);
  }
}