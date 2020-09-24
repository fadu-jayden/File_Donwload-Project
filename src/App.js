import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import Upload from './components/Upload.js';
import Board from './components/Board.js';
import {Route, Link} from 'react-router-dom';



const App = () => {


  return(
    <div>
      <Link to="/Upload">업로드</Link>
      <Link to="/Board">게시판</Link>
      
      <Route path={['/Upload','/']} component ={Upload} exact={true}></Route>
      <Route path="/Board" component={Board}></Route>
    </div>    
  );//render() end
};

export default App;