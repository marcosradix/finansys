import { CategoryModel } from './pages/categories/shared/category.model';
import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService{

    createDb(){
        const categories: Array<CategoryModel> = [
            {id: 1, name: "Moradia", description: "Pagamentos de contas da casa"},
            {id: 2, name: "Saúde", description: "Plano de saúde e remédios"},
            {id: 3, name: "Lazer", description: "Cinema, parque, praia, etc"},
            {id: 4, name: "Salário", description: "Recebimento de salário"},
            {id: 5, name: "Freelas", description: "Trabalhos como freelas"}
        ];

        return {categories};
    }

}