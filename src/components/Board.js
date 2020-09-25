import React, {Component} from 'react';
import TableModule from './Table.js';
import SearchModule from './Search.js';
import axios from 'axios';
import '../css/board.css';

class Board extends Component{

    constructor(){
        super();
        // this.state={
        //     getArticles:[],
        // }

        // this.getArticlesList();
    }//cons end


    // async getArticlesList() {

    //     console.log(`부모컴포넌트에서 데이터를 받아와`)
    //     let datas;

    //     await axios.get('http://10.10.13.137:9000/ae/boardlist',
    //     {
    //         headers: {
    //             Accept: 'application/json'
    //         }
    //     })
    //     .then((response)=>{
    //         datas = response.data.boards;
    //     });
    //     this.setState({getArticles:datas});

    // }//getArticlesList() end

    render(){
        // const getFiles = this.state.getFiles;

        return <div id="layout_board">
            <SearchModule></SearchModule>
            <TableModule></TableModule>
        </div>;
    }//render() end
}

export default Board;