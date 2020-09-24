import React,{Component} from 'react'
import {Search} from 'semantic-ui-react';

class SearchModule extends Component {

    constructor(){
        super();
    }

    render(){
        return<div>
            <Search></Search>
        </div>;
    }//render() end
}

export default SearchModule;