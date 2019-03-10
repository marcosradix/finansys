import { CategoryModel } from './pages/categories/shared/category.model';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EntryModel } from './pages/entries/shared/model/entry.model';

export class InMemoryDatabase implements InMemoryDbService {

    createDb() {
        const categorias: Array<CategoryModel> = [
            { id: 1, name: "Moradia", description: "Pagamentos de contas da casa" },
            { id: 2, name: "Saúde", description: "Plano de saúde e remédios" },
            { id: 3, name: "Lazer", description: "Cinema, parque, praia, etc" },
            { id: 4, name: "Salário", description: "Recebimento de salário" },
            { id: 5, name: "Freelas", description: "Trabalhos como freelas" }
        ];

        const entries: Array<EntryModel> = [
            {
                id: 1,
                name: "Boleto de água",
                categoryId: categorias[0].id,
                category: categorias[0],
                paid: false,
                date: "11/11/2019",
                amount: "10,00",
                type: 0,
                description: "pagamento desse mês"
            } as EntryModel,
            {
                id: 1,
                name: "Gás de cozinha",
                description: "pagamento desse mês",
                type: 0, amount: "150,00",
                date: "14/10/2018",
                paid: true,
                categoryId: categorias[0].id,
                category: categorias[0]
            } as EntryModel
        ];

        return { categorias, entries };
    }

}