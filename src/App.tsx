import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { CouchDBClient } from './data/impl/couchdb/CouchDBClient';
import { IDataStore } from './data/IDataStore';
//
interface IAppProps{
}
interface IAppState {
  displayText:string;
}
//
class App extends React.Component<IAppProps,IAppState>{
  dataManager:IDataStore;
  constructor(props?:any){
    super(props);
    this.state = {
      displayText:""
    };
    this.handleTest = this.handleTest.bind(this);
    //
    this.dataManager = new CouchDBClient();
  }// construxtor
  private async performTest(){
    let sRet='';
    //
    let sel={
      type:{
          $eq: 'etud'
      }
  };
  let start = 0;
  let count = 5;
  let fields = ["_id","firstname","lastname","avatar"];
  let pp =await this.dataManager.findDocsBySelector(sel,start,count,fields);
  if (pp !== undefined && pp !== null){
    sRet = JSON.stringify(pp);
  }
    //
    this.setState({
      displayText: sRet
    });
  }// performTest
  private async handleTest(e:any){
    await this.performTest();
  }// handleTest
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p>
          <button onClick={this.handleTest}>Test!</button>
        </p>
        <p className="App-intro">
         {this.state.displayText}
        </p>
      </div>
    );
  }
}

export default App;
