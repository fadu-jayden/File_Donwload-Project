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

  // <input type="file" onChange={(e) => this.selectFile(e)}></input> 일 경우,
  // //선택된 파일이 변경될때(onChange이벤트) 일어나는 콜백함수 manageFile
  // selectFile(e) {
  //   let fileList = e.target.files; //Input요소에서 선택한 파일들의 집합, ArrayLike형태인 FileList로 담김
  //   let file = fileList[0]; //리스트중에 제일 첫번째 요소를 반환
    
  //   let reader = new FileReader(); //파일리더 객체 생성
  //   this.loadFile(file, reader, this.copyFile);
  // }//manageFile() end

  //  loadFile(file, reader, copyFile) {
  //   let content = "";
  //   reader.readAsText(file);
  //   reader.onload = function(progressEvent) { //파일리더 객체의 읽기메소드 성공시 호출하는 함수 정의
  //     content = reader.result;
  //     copyFile(file.name,content);
  //   };
  // }//loadFile() end

  loadFile(copyFile) {

    let rawFile = new XMLHttpRequest();
    let totalFileName = "file:///C:/your/path/to/test.txt" ;
    //       D:\workspace\annes_order\filedownload_project\src\datas

    // let totalFileName = filePath+fileName;

    // let testFileName = "./real.txt";
    // alert("rawFile 오픈 전");
    rawFile.open("GET",totalFileName,false);
    // alert("rawFile 오픈 후");
    rawFile.onreadystatechange = function(){
      alert("함수는 실행되었다.");
        if(rawFile.readyState === 4){
          if(rawFile.status === 200 || rawFile.status == 0){
            let allText = rawFile.responseText;
            alert("리스폰스 = "+rawFile.response);
            alert("리스폰스 타입 = "+rawFile.responseType);
            alert("리스폰스 URL = "+rawFile.responseURL);
            alert("리스폰스 텍스트 = "+allText);

            copyFile(totalFileName,allText);
          }//if end
        }//if end
    }//onreadystatechange() end
    rawFile.send(null);
  }//manageFile() end

  copyFile = (fileName,content) => {

    let blob = new Blob([content],{type:'text/plain'});
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

      <button style={{width: '100px',height: '100px'}} type="button" onClick={(e)=>( this.loadFile(this.copyFile) ) } >경로파일을 다운로드하자</button>
    </div>;
  }//render() end
}

export default App;