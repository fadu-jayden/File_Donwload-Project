import React, {Component} from 'react';
import TableModule from './Table.js';
import SearchModule from './Search.js';

class Board extends Component{

    constructor(){
        super();
        this.state={
        }
    }//cons end



    render(){
        return <div>
            <SearchModule></SearchModule>
            <TableModule></TableModule>
        </div>;
    }//render() end
}

export default Board;