import { CategoryModel } from './../../../categories/shared/category.model';
export class EntryModel{

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

    ){}

    static types ={
        expensive : "DESPESA",
        revenue: "RECEITA"
    }

    get paidText(): string{
        return this.paid ? 'Pago' :'Pendente';
        
    }
}