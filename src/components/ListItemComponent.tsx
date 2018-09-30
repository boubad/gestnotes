import * as React from 'react';
//
interface IListItemProps {
    docid?:string;
    displayText?:string;
    url?:string;
    forceRender?:boolean;
    onItemSelected? : (id:string) => any;
}// interfaceIListItemProps
//
interface IListItemState {
    docid:string;
    displayText:string;
    url:string;
    forceRender:boolean;
}// interface IListItemState
export class ListItemComponent extends React.Component<IListItemProps,IListItemState> {
    constructor(props?:any){
        super(props);
        this.state = {
            docid: (this.props.docid !== undefined && this.props.docid !== null) ? this.props.docid : "",
            displayText: (this.props.displayText !== undefined && this.props.displayText !== null) ? this.props.displayText : "",
            url: (this.props.url !== undefined && this.props.url !== null) ? this.props.url : "",
            forceRender: (this.props.forceRender !== undefined && this.props.forceRender !== null) ? this.props.forceRender : false
        };
        this.handleClicked = this.handleClicked.bind(this);
    }// constructor
    public componentWillReceiveProps(nextProps:IListItemProps){
        let oState={};
        if (nextProps.forceRender !== this.props.forceRender){
            oState['forceRender'] = (nextProps.forceRender !== undefined &&  nextProps.forceRender !== null) ? nextProps.forceRender : false;
        }
        if (nextProps.docid !== this.props.docid){
            oState['docid'] = (nextProps.docid !== undefined && nextProps !== null) ? nextProps.docid : "";
        }
        if (nextProps.displayText !== this.props.displayText){
            oState['displayText'] = (nextProps.displayText !== undefined && nextProps.displayText !== null) ? nextProps.displayText : ""; 
        }
        if (nextProps.url !== this.props.url){
            oState['url'] = (nextProps.url !== undefined && nextProps.url !== null) ? nextProps.url : "";
        }
        this.setState(oState);
    }//componentWillReceiveProps
    private handleClicked(e:any){
        if (this.props.onItemSelected !== undefined && this.props.onItemSelected !== null){
            this.props.onItemSelected(this.state.docid);
        }
    }// handleClicked
    private get_image(){
        if (this.state.url.length > 0){
            return (<img src={this.state.url} height={48} alt={this.state.displayText} onClick={this.handleClicked} />);
        }else {
            return (<div />);
        }
    }// get_image
    public render(){
        return(
            <li>
                {this.get_image()}
                <a href='#' onClick={this.handleClicked} >{this.state.displayText}</a>
            </li>
        );
    }// render
}// class ListItemComponent