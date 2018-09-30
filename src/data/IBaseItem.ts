import { IBaseDoc } from "./IBaseDoc";
export interface IBaseItem extends IBaseDoc {
    type?: string;
    name?: string;
    desc?: string;
    item_date?: Date;
} // interface IBaseItem
