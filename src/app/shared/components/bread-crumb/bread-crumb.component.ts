import { Component, OnInit , Input} from '@angular/core';
import { BreadCrumbItem } from './../../models/breadCrumbItem.model';


@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input() items: Array<BreadCrumbItem> = [];

  constructor() { }

  ngOnInit() {
  }

  isLastItem(item: BreadCrumbItem):boolean{
    const index: number = this.items.indexOf(item);
    return this.items.length == (index + 1);
  }

}
