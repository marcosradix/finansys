import { Component } from '@angular/core';
import { EntryService } from "../shared/entry.service";
import { EntryModel } from '../shared/model/entry.model';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';

@Component({
  selector: 'app-cotegory-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<EntryModel> {
  
  constructor(
    protected entryService: EntryService,
  ) { 
    super(entryService);
  }
  
}
