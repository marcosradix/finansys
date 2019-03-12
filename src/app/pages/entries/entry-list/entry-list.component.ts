import { Component, OnInit } from '@angular/core';
import { EntryService } from "../shared/Entry.service";
import { EntryModel } from '../shared/model/entry.model';

@Component({
  selector: 'app-cotegory-list',
  templateUrl: './Entry-list.component.html',
  styleUrls: ['./Entry-list.component.css']
})
export class EntryListComponent implements OnInit {

  entries: Array<EntryModel> = [];

  constructor(
    private entryService: EntryService,
  ) { }

  ngOnInit() {
    this.entryService.getAll().subscribe(
      c => this.entries = c.sort((a,b) => b.id - a.id),
      error => alert("Erro ao carregar categorias.")
    );
  }
  deleteEntry(Entry: EntryModel) {
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if(mustDelete){
      this.entryService.deleteResource(Entry.id).subscribe(() => {
       this.entries =  this.entries.filter(element => element != Entry);
        alert("Deletado com sucesso!")
      }, () => alert("Erro ao tentar excluir."));
    }
  }
  
}
