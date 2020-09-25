import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class Article {
    constructor(id,title,writer,createdDate){
        this.id=id
        this.title=title;
        this.writer=writer;
        this.createdDate=createdDate;
    }//cons end
}//class Article

class TableModule extends Component{

    constructor(){
        super();
        this.state={
            articles:[new Article(1,'TE파트 딘의 일기','딘','2019년1월2일'),
            new Article(1,'백다방','백종원','2020년2월3일'),
            new Article(1,'리향 짜장면','주방장','2020년4월8일')]
        }
    }//cons end

    render(){

        const articles = this.state.articles;

        return   <Table id="section_table" celled singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell id="headerCell_id">ID</Table.HeaderCell>
            <Table.HeaderCell>TITLE</Table.HeaderCell>
            <Table.HeaderCell>WRITER</Table.HeaderCell>
            <Table.HeaderCell id="headerCell_createdDate">CREATED DATE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            {articles.map((article)=>{
                return(
                <Table.Row>
                <Table.Cell>{article.id}</Table.Cell>
                <Table.Cell>{article.title}</Table.Cell>
                <Table.Cell>{article.writer}</Table.Cell>
                <Table.Cell>{article.createdDate}</Table.Cell>
                </Table.Row>);
            })}
        </Table.Body>
      </Table>
    }//render() end
}

export default TableModule;