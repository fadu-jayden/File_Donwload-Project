import React,{Component} from 'react'
import {Button, Form} from 'semantic-ui-react';

class SearchModule extends Component {

    constructor(){
        super();
        this.state={
            titleInp:'',
            writerInp:'',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }//cons end 

    handleChange(e,{name,value}){
        this.setState({[name]:value});
        // console.log(`${name} = ${value}`)
    }//handleChange() end

    handleSearch(){
        this.props.searchFunction.changeSearchInfo(this.state.titleInp,this.state.writerInp);
    }//handleSearch() end

    render(){

        const {titleInp, writerInp} = this.state;

        return<div id="section_search">
            <Form>
                <Form.Group>
                    <Form.Input
                        label='Title'
                        placeholder='Title'
                        name='titleInp'
                        value={titleInp}
                        //onChange
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        label='Writer'
                        placeholder='Writer'
                        name='writerInp'
                        value={writerInp}
                        //onChange
                        onChange={this.handleChange}
                    />
                    <Button
                        icon='search'
                        content='Search'
                        color='teal'
                        //onClick
                        onClick={this.handleSearch}
                    />
                </Form.Group>
            </Form>
            {/* <Input id="inp_search" placeholder="검색어를 입력해주세요"></Input>
            <Button id="btn_search" >Search</Button> */}
        </div>;
    }//render() end
}

export default SearchModule;