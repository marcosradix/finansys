import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators as valid } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CategoryModel as Category } from "../shared/category.model";
import { CategoryService } from './../shared/category.service';
import { switchMap } from "rxjs/operators";
import toastr from "toastr";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();


  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  setPageTitle(): void {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de nova categoria";
    }

    if (this.currentAction == "edit") {
      const categoryName = this.category.name || "";
      this.pageTitle = `Editando categoria: ${categoryName}`;
    }
  }

  constructor(private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
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
  buildCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [valid.required, valid.minLength(2)]],
      description: [null]
    });
  }
  loadCategory(): void {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getCategoryById(+params.get("id")))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);//binds loaded category to categoryForm 
        },
        (error) => alert("Ocorreu um erro no servidor.")
      );
    }
  }

  submitFormAction() {
    this.submittingForm = true;
    if (this.currentAction == "new") {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }
  private updateCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.updateCategory(category)
    .subscribe(
      cat => this.actionsForSuccess(cat),
      error => this.actionsForError(error)
    );
  }
  private createCategory(): void {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);
    this.categoryService.createCategory(category).subscribe(
      cat => this.actionsForSuccess(cat),
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
  actionsForSuccess(cat: Category): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("categorias", {skipLocationChange: true}).then(
      () => this.router.navigate(["categorias", cat.id, "edit"])
    );
  }

}
