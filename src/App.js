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
  selectFile(e) {
    
    let fileList = e.target.files; //Input요소에서 선택한 파일들의 집합, ArrayLike형태인 FileList로 담김
    let file = fileList[0]; //리스트중에 제일 첫번째 요소를 반환
    
    let fileName = file.name;
    let content = "";
    
    let reader = new FileReader(); //파일리더 객체 생성
    content = this.loadFile(file, reader);

    alert(fileName);
    alert(content);

    this.copyFile(fileName,content);
  }//manageFile() end

  async loadFile(file, reader) {
    let content = "";
    reader.onload = function(progressEvent) { //파일리더 객체의 읽기메소드 성공시 호출하는 함수 정의
      alert(progressEvent.target.result); //여기에 Content를 받아야하는데 ... 왜 내용이 안받아지지
    };
    reader.readAsText(file);
    return content; 
  }//loadFile() end

  copyFile(file,content) {
    let fileName = "copy.txt";
    let text = "I'm copy master";

    let blob = new Blob([text],{type:'text/plain'});
    let link = document.createElement("a");
    link.download = fileName;
    link.innerHTML = "Download File";
    link.href= window.URL.createObjectURL(blob);
    document.body.appendChild(link);

  }//copyFile() end

  render(){
    const number = this.state.number;
    const text = this.state.text;
    return <div>
      <h1>Hello</h1>
      <h2>File DownLoad</h2>
      <h3> {number} </h3>
      <button onClick={()=>{this.setState({number : number+1});}}> +1 </button>
      <h4>{text}</h4>
      
      <input type="file" onChange={(e) => this.selectFile(e)} />
    </div>;
  }//render() end
}

export default App;
