import { CategoryModel } from './../../../categories/shared/category.model';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
export class EntryModel extends BaseResourceModel{

    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public type?: string,
        public amount?: string,
        public date?: string,
        public paid?: boolean,
        public categoryId?: number,
        public category?: CategoryModel,

    ){
        super();
    }

    static types ={
        expensive : "DESPESA",
        revenue: "RECEITA"
    }

    get paidText(): string{
        return this.paid ? 'Pago' :'Pendente';
        
    }
}