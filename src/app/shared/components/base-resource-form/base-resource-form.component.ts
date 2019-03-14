import { CategoryModel } from './../../../pages/categories/shared/category.model';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Injector, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators as valid } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";


import { switchMap } from "rxjs/operators";
import toastr from "toastr";

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;


  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonResourceFn: (jsonData) => T
    ) {
        this.route = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
        this.formBuilder = this.injector.get(FormBuilder);
     }
  
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  setPageTitle(): void {
    if (this.currentAction == "new") {
      this.pageTitle = this.creationPageTitle();
    }
    if (this.currentAction == "edit") {
      this.pageTitle = this.editionPageTitle();
    }
  }
  protected editionPageTitle(): string {
        return "edição ";
    }
    protected creationPageTitle(): string {
        return "novo";
    }



  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }
  setCurrentAction(): void {
    if (this.route.snapshot.url[0].path == "new") {
      this.currentAction = "new";
    } else {
      if (this.route.snapshot.url[1].path == "edit") {
        this.currentAction = "edit";
      }
    }


  }

  loadResource(): void {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getResourceById(+params.get("id")))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);//binds loaded resource to resourceForm 
        },
        (error) => alert("Ocorreu um erro no servidor.")
      );
    }
  }

  submitFormAction() {
    this.submittingForm = true;
    if (this.currentAction == "new") {
      this.createResource();
    } else {
      this.updateResource();
    }
  }
  protected updateResource(): void {
    const resource: T = this.jsonResourceFn(this.resourceForm.value);
    this.resourceService.updateResource(resource)
    .subscribe(
        res => this.actionsForSuccess(res),
      error => this.actionsForError(error)
    );
  }
  protected createResource(): void {
    const resource: T = this.jsonResourceFn(this.resourceForm.value);
    this.resourceService.createResource(resource).subscribe(
      res => this.actionsForSuccess(res),
      error => this.actionsForError(error)
    );
  }
  actionsForError(error: any): void {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;
    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor."];
    }
  }
  actionsForSuccess(resource: T): void {
    toastr.success("Solicitação processada com sucesso!");
    const baseComponentPath: string = this.route.parent.snapshot.url[0].path;
    this.router.navigateByUrl(baseComponentPath, {skipLocationChange: true}).then(
      () => this.router.navigate([baseComponentPath, resource.id, "edit"])
    );
  }
protected abstract buildResourceForm():void;

}
