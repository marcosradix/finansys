import { Component, OnInit } from '@angular/core';
import { CategoryModel } from "../shared/category.model";
import { CategoryService } from "../shared/category.service";

@Component({
  selector: 'app-cotegory-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Array<CategoryModel> = [];

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      c => this.categories = c,
      error => alert("Erro ao carregar categorias.")
    );
  }
  deleteCategory(category: CategoryModel) {
    this.categoryService.deleteCategory(category.id).subscribe(() => {
     this.categories =  this.categories.filter(element => element != category);
      alert("Deletado com sucesso!")
    }, () => alert("Erro ao tentar excluir."));

  }
}
