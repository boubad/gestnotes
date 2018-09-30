import * as React from 'react';
import  { ListItemComponent } from './ListItemComponent';
import { IListItem } from '../data/IListItem';

interface IListItemsProps {
    items:IListItem[];
    forceRender?:boolean;
    onItemSelected? : (id:string) => any;
}// interface IListItemsProps
interface IListItemsState {
    items:IListItem[];
    forceRender:boolean;
}// interface IListItemsState

export class ListItemsComponent extends React.Component<IListItemsProps,IListItemsState>{
    constructor(props?:any){
        super(props);
        this.state = {
            items: (this.props.items !== undefined && this.props.items !== null) ? this.props.items : [],
            forceRender: (this.props.forceRender !== undefined && this.props.forceRender !== null) ? this.props.forceRender : false
        };
        this.onItemSelected = this.onItemSelected.bind(this);
    }// constructor
    private formatArray(oAr?:IListItem[]) : IListItem[]{
        let ppx:IListItem[] = (oAr !== undefined && oAr !== null) ? oAr : [];
        let pp = new Array<IListItem>();
        let n = ppx.length;
        for (let i = 0; i < n; i++){
            let p = ppx[i];
            if (p.displayText !== undefined && p.displayText !== null && p.displayText.length > 0){
                pp.push(p);
            }
        }// i
        return (pp);
    }// formatArray
    private onItemSelected(id:string){
        if (this.props.onItemSelected !== undefined && this.props.onItemSelected !== null){
            this.props.onItemSelected(id);
        }
    }// onItemSelected
    public componentWillReceiveProps(nextProps:IListItemsProps){
        let oState = {};
        if (nextProps.forceRender !== this.props.forceRender){
            oState['forceRender'] = (nextProps.forceRender !== undefined && nextProps.forceRender !== null) ? nextProps.forceRender: false;
        }
        oState['items'] = this.formatArray(nextProps.items);
        this.setState(oState);
    }//componentWillReceiveProps
    public render(){
        if (this.state.items.length < 1){
            return(<div/>);
        } else {
            let nId=100;
            return(
                <ul>
                    {this.state.items.map((item)=>{
                       return(
                           <ListItemComponent  key={"" + (nId++)}
                              displayText={item.displayText}
                              docid={item.docid}
                              url={item.url}
                              forceRender={this.state.forceRender}
                              onItemSelected={this.onItemSelected}
                           />
                       );
                    })}
                </ul>
            );
        }
    }// render
}// class IListItemsState
