export interface ICouchDBDoc {
     _id?: string;
    _rev?: string;
    _deleted?: boolean;
    _attachments?: any;
    _conflicts?:any[];
    _deleted_conflicts?:any[];
    _local_seq?:string;
    _revs_info?:any[];
    _revisions?:any;
}