import React, {Component} from 'react';
// import axios from 'axios';


class App extends Component{
  constructor() {
    super();
    this.state={
      text : "Nothing",
      number : 0
    };
  }//cons() end

  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()

    reader.onload = async (e) => { 
      const text = (e.target.result)
      console.log(text)
      alert(text)
    };
    
    reader.readAsText(e.target.files[0])
  }



  render(){
    const number = this.state.number;
    const text = this.state.text;
    return <div>
      <h1>Hello</h1>
      <h2>File DownLoad</h2>
      <h3> {number} </h3>
      <button onClick={()=>{this.setState({number : number+1});}}> +1 </button>
      <h4>{text}</h4>
      
      <input type="file" onChange={(e) => this.showFile(e)} />
    </div>;
  }//render() end
}

export default App;
