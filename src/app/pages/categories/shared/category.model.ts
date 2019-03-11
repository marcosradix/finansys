import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';


export class CategoryModel extends BaseResourceModel{
    constructor(public id?: number,
        public name?: string,
        public description?: string){
            super();
        }
}