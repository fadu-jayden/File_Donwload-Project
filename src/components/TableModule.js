import React, {Component} from 'react';
import {Table, Pagination} from 'semantic-ui-react';

class TableModule extends Component{

    constructor(){
        super();
        this.state={
            modalState:false,
            modalContent:'',
        }

        this.changePage = this.changePage.bind(this);
        // this.showContent = this.showContent.bind(this);
        // this.closeModal = this.closeModal.bind(this);
    }//cons end
    

    //이거 대신에 부모에 바뀐 page번호를 넘겨줘야함
    changePage(e,data) {
        const changePageNo = data.activePage-1;
        this.props.pageFunction.changePageNo(changePageNo);
    }//changePage() end

    clickArticle(id){
        const a = document.createElement('a');
        a.href=`/Board?id=${id}`;
        a.click();
    }//clickArticle() end

    render(){

        const getArticles = this.props.pageInfo.articles;
        const offestSize = this.props.pageInfo.size;
        const totalCount = this.props.pageInfo.totalCount;

        return<div>
        <Table id="section_table" celled singleLine selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell id="headerCell_id">ID</Table.HeaderCell>
                    <Table.HeaderCell>TITLE</Table.HeaderCell>
                    <Table.HeaderCell>WRITER</Table.HeaderCell>
                    <Table.HeaderCell id="headerCell_date">DATE</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            
            <Table.Body>
                {getArticles.map((article,index)=>{
                    return(
                        <Table.Row key={index} onClick={   ()=>this.props.pageFunction.changeArticleId(article.id)} >
                    <Table.Cell>{article.id}</Table.Cell>
                    <Table.Cell>{article.title}</Table.Cell>
                    <Table.Cell>{article.writer}</Table.Cell>
                    <Table.Cell>{article.date}</Table.Cell>
                    </Table.Row>);
                })}
            </Table.Body>
        </Table>
        <div id="section_pagination">
            <Pagination
            defaultActivePage={1}
            totalPages={Math.ceil(totalCount/offestSize)}
            onPageChange={(e,data)=>{this.changePage(e,data);}}
            />
        </div>
      </div>
    }//render() end
}

TableModule.defaultProps ={
    pageInfo : { 
        articles:[{id:1,title:'title',writer:'writer',date:'date'}]
    }
}

export default TableModule;