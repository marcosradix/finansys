import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-field-error',
  template: `
    <p class="text-danger">
     {{errorMessage}}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {
  @Input("form-control") formControl: FormControl;
  getErroMessage(): string {
    if(this.formControl.errors.required){
      return "dado obrigatório";
    }else if(this.formControl.errors.minlength){
      const requiredMinlength = this.formControl.errors.minlength.requiredLength;
      return `deve ter no mínimo ${requiredMinlength}`;
    }else if(this.formControl.errors.maxlength){
      const requiredMaxlength = this.formControl.errors.maxlength.requiredLength;
      return `deve ter no mínimo ${requiredMaxlength}`;
    }else if(this.formControl.errors.email){
      return `formato de email inválido`;
    }
  }

  constructor() { }

  ngOnInit() {
  }
  public get errorMessage(): string | null {
    if (this.mustShowErrorMessage()) {
      return this.getErroMessage() ;
    } else {
      return null;
    }
  }
  private mustShowErrorMessage(): boolean{
    return this.formControl.invalid && this.formControl.touched;
  }
}
