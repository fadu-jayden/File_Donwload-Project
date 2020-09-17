import React, {Component} from 'react';
// import axios from 'axios';
import fs from 'fs';


class App extends Component{
  constructor() {
    super();
    this.state={
      text : "Nothing",
      number : 0
    };
    this.getData();
  }//cons() end

  getData(){
    let data = fs.readFileSync('/datas/test.txt','utf-8');
    this.setState({text:data});
  }//getData() end


  render(){
    const number = this.state.number;
    const text = this.state.text;
    return <div>
      <h1>Hello</h1>
      <h2>File DownLoad</h2>
      <h3> {number} </h3>
      <button onClick={()=>{this.setState({number : number+1});}}> +1 </button>
      <h4>{text}</h4>
    </div>;
  }//render() end
}

export default App;
