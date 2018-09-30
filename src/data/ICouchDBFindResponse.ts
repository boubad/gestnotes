export interface ICouchDBFindResponse<T extends Object> {
    docs:T[];
    warning?:string;
    execution_stats?:Object;
    bookmark?:string;
}
