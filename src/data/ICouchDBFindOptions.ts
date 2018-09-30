export interface ICouchDBFindOptions {
    selector:Object;
    limit?:number;
    skip?:number;
    sort?:Object[];
    fields?:string[];
    use_index?:string | string[];
    r?:number;
    bookmark?:string;
    update?:boolean;
    stable?:boolean;
    stale?:string;
    execution_stats?:boolean;
}