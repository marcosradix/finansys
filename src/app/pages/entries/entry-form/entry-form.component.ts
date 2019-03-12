import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './../shared/model/entry.model';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators as valid } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { EntryService } from './../shared/Entry.service';
import { switchMap } from "rxjs/operators";
import toastr from "toastr";
import { CategoryModel } from '../../categories/shared/category.model';

@Component({
  selector: 'app-Entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  entryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submitingForm: boolean = false;
  entry: EntryModel = new EntryModel();
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
  value: Date;
  pt_BR : any;
  categories : Array<CategoryModel> = [];



  ngAfterContentChecked(): void {
    this.setPageTitle();
  }
  setPageTitle(): void {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de novo lançamento";
    }

    if (this.currentAction == "edit") {
      const entryName = this.entry.name || "";
      this.pageTitle = `Editando lançamento: ${entryName}`;
    }
  }

  constructor(private entryService: EntryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildEntryForm();
    this.loadEntry();
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do","Se","Te","Qa","Qu","Se","Sa"],
      monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
      monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
      today: 'Hoje',
      clear: 'Limpar',
      dateFormat: 'dd/mm/yyyy',
  };
  this.loadCategories();
  }
  private loadCategories(): any {
    return this.categoryService.getAll().subscribe(categories =>{
      this.categories = categories;
    });
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
  buildEntryForm(): void {
    this.entryForm = this.formBuilder.group({
      id: [null],
      name: [null, [valid.required, valid.minLength(2)]],
      description: [null],
      type: ["expensive" , [valid.required]],
      amount: [null , [valid.required]],
      date: [null , [valid.required]],
      paid: [true , [valid.required]],
      categoryId: [null , [valid.required]],

    });
  }
  loadEntry(): void {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.entryService.getResourceById(+params.get("id")))
      ).subscribe(
        (entry) => {
          this.entry = entry;
          this.entryForm.patchValue(entry);//binds loaded Entry to EntryForm 
        },
        (error) => alert("Ocorreu um erro no servidor.")
      );
    }
  }

  submitFormAction() {
    this.submitingForm = true;
    if (this.currentAction == "new") {
      this.createEntry();
    } else {
      this.updateEntry();
    }
  }
  private updateEntry(): void {
    const entry: EntryModel = EntryModel.fromJson(this.entryForm.value);
    this.entryService.updateEntry(entry)
    .subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }
  private createEntry(): void {
    const entry: EntryModel = EntryModel.fromJson(this.entryForm.value);
    this.entryService.createEntry(entry).subscribe(
      entry => this.actionsForSuccess(entry),
      error => this.actionsForError(error)
    );
  }
  actionsForError(error: any): void {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submitingForm = false;
    if(error.status == 422){
      this.serverErrorMessages = JSON.parse(error._body).errors;
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor."];
    }
  }
  actionsForSuccess(entry: EntryModel): void {
    toastr.success("Solicitação processada com sucesso!");
    this.router.navigateByUrl("entries", {skipLocationChange: true}).then(
      () => this.router.navigate(["entries", entry.id, "edit"])
    );
  }

  get typeOptions(): Array<any>{
     return Object.entries(EntryModel.types).map(
       ([value, text]) => {
        return{
          text: text,
          value: value
        }
       }
     )
  }

}
