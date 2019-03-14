import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { OnInit } from '@angular/core';


export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: Array<T> = [];

  constructor(
    protected resourceService: BaseResourceService<T>,
  ) { }

  ngOnInit() {
    this.resourceService.getAll().subscribe(
      c =>{
         this.resources = c.sort((a,b) => b.id - a.id)
        },
      error => alert("Erro ao carregar lançamentos.")
    );
  }
  deleteResource(resource: T) {
    const mustDelete = confirm("Deseja realmente excluir este item?");
    if(mustDelete){
      this.resourceService.deleteResource(resource.id).subscribe(() => {
       this.resources =  this.resources.filter(element => element != resource);
        alert("Deletado com sucesso!")
      }, () => alert("Erro ao tentar excluir."));
    }
  }
  
}
