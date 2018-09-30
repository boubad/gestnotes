export interface ICouchDBAttachmentInfo {
    name?:string;
    content_type:string;
    data?:string;
    digest:string;
    encoded_length?:number;
    encoding?:string;
    length?:number;
    revpos:number;
    stub?:boolean;
}
