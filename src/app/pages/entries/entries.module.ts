
import { NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { EntriesRoutingModule } from './entries-routing.module';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryFormComponent } from './entry-form/entry-form.component';
import {CalendarModule} from 'primeng/calendar';
import { IMaskModule } from "angular-imask";
import ptBr from '@angular/common/locales/pt';
import { SharedModule } from 'src/app/shared/shared.module';

registerLocaleData(ptBr);

@NgModule({
  declarations: [EntryListComponent, EntryFormComponent],
  imports: [
    SharedModule,
    EntriesRoutingModule,
    CalendarModule,
    IMaskModule,
  ]
})
export class EntriesModule { }
