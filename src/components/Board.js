import React, {Component} from 'react';
import TableModule from './Table.js';
import SearchModule from './Search.js';
import '../css/board.css';

class Board extends Component{

    constructor(){
        super();
        this.state={
        }
    }//cons end



    render(){
        return <div id="layout_board">
            <SearchModule></SearchModule>
            <TableModule></TableModule>
        </div>;
    }//render() end
}

export default Board;