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


  //선택된 파일이 변경될때(onChange이벤트) 일어나는 콜백함수 manageFile
  manageFile(e) {
    
    let fileList = e.target.files; //Input요소에서 선택한 파일들의 집합, ArrayLike형태인 FileList로 담김
    let file = fileList[0]; //리스트중에 제일 첫번째 요소를 반환

    let reader = new FileReader(); //파일리더 객체 생성
    reader.onload = function(progressEvent) { //파일리더 객체의 읽기메소드 성공시 호출하는 함수 정의
      alert( progressEvent.target.result);
      
    };
    reader.readAsText(file);
  }//manageFile() end

  render(){
    const number = this.state.number;
    const text = this.state.text;
    return <div>
      <h1>Hello</h1>
      <h2>File DownLoad</h2>
      <h3> {number} </h3>
      <button onClick={()=>{this.setState({number : number+1});}}> +1 </button>
      <h4>{text}</h4>
      
      <input type="file" onChange={(e) => this.manageFile(e)} />
    </div>;
  }//render() end
}

export default App;
