import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { CategoryService } from './../../categories/shared/category.service';
import { EntryModel } from './../shared/model/entry.model';
import { Component, Injector, OnInit } from '@angular/core';
import { Validators as valid } from "@angular/forms";
import { CategoryModel } from '../../categories/shared/category.model';
import { EntryService } from '../shared/entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<EntryModel> implements OnInit {
  categories: Array<CategoryModel> = [];
  imaskConfig = {
    mask: Number,
    scale: 2,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
  pt_BR: any;
  value: Date;

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector) {
    super(injector, new EntryModel(), entryService, EntryModel.fromJson)
  }
  

  ngOnInit() {
    super.ngOnInit();
    this.loadCategories();
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      dayNamesMin: ["Do", "Se", "Te", "Qa", "Qu", "Se", "Sa"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
      today: 'Hoje',
      clear: 'Limpar'
    };

  }
  protected loadCategories(): any {
    return this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
  protected buildResourceForm(): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [valid.required, valid.minLength(2)]],
      description: [null],
      type: ["expensive", [valid.required]],
      amount: [null, [valid.required]],
      date: [null, [valid.required]],
      paid: [true, [valid.required]],
      categoryId: [null, [valid.required]],

    });
  }

  get typeOptions(): Array<any> {
    return Object.entries(EntryModel.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }
  protected creationPageTitle(): string {
    return "Cadastro de novo lançamento";
  }
  protected editionPageTitle(): string {
    return `Edição de lançamento:  ${this.resource.name || ""}`;
  }
}
