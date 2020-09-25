import React,{Component} from 'react'
import {Button, Input} from 'semantic-ui-react';

class SearchModule extends Component {

    render(){
        return<div id="section_search">
            <Input id="inp_search" placeholder="검색어를 입력해주세요"></Input>
            <Button id="btn_search">Search</Button>
        </div>;
    }//render() end
}

export default SearchModule;