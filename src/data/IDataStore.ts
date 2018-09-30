import {ICouchDBAttachmentInfo} from './ICouchDBAttachmentInfo';
//
export interface IDataStore {
    isAlive() : Promise<boolean>;
    info(): Promise<any>;
    formBlobUrl(id:string,name:string) : string;
    findBlobsByOwnerId(sid:string): Promise<ICouchDBAttachmentInfo[]>;
    maintainsBlob(id:string, name:string, mime:string, data:Blob) : Promise<string>;
    removeBlob(id:string, name:string): Promise<boolean>;
    findDocsBySelector(sel:any,start?:number, count?:number,fields?:string[]) :Promise<any[]>;
    findDocById(id:string) : Promise<any>;
    maintainsDoc(doc:any) : Promise<boolean>;
    removeDoc(id:string) : Promise<boolean>;
    findManyDocs(ids:string[]) : Promise<any[]>;
}// inte
