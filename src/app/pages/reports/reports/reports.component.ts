import { EntryService } from './../../entries/shared/entry.service';
import { EntryModel } from './../../entries/shared/model/entry.model';
import { CategoryService } from './../../categories/shared/category.service';
import { CategoryModel } from './../../categories/shared/category.model';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import currencyFormatter from 'currency-formatter';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
    ) { }

  ngOnInit() {
  }

}
