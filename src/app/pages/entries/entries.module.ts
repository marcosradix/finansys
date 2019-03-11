import { ReactiveFormsModule } from '@angular/forms';
import { NgModule} from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {CalendarModule} from 'primeng/calendar';
import { IMaskModule } from "angular-imask";
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
  ]
})
export class EntriesModule { }
