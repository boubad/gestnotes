import { IBaseDoc } from './IBaseDoc';
//
export interface INote extends IBaseDoc {
    etudiantid?: string;
    eventid?: string;
    value?: number;
}