import React, {Component} from 'react';
import {Table, Pagination, Modal} from 'semantic-ui-react';
import axios from 'axios';

// class Article {
//     constructor(id,title,writer,date){
//         this.id=id
//         this.title=title;
//         this.writer=writer;
//         this.date=date;
//     }//cons end
// }//class Article

class TableModule extends Component{

    constructor(){
        super();
        this.state={
            getArticles:[],
            showArticles:[],
            pageNo:1,
            offestSize:5,
            modalState:false,
            modalContent:'',
        }

        this.getArticlesList = this.getArticlesList.bind(this);
        this.paintArticles = this.paintArticles.bind(this);
        this.changePage = this.changePage.bind(this);
        this.showContent = this.showContent.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.getArticlesList();
    }//cons end

    async getArticlesList() {
        let datas;

        await axios.get('http://10.10.13.137:9000/ae/boardlist',
        {
            headers: {
                Accept: 'application/json'
            }
        })
        .then((response)=>{
            datas = response.data.boards;
        });
        this.setState({getArticles:datas});
        this.paintArticles();    
    }//getArticlesList() end
    

    paintArticles(){
        const {getArticles} = this.state;
        const maxSize = getArticles.length;
        let showArticles = [];
        let {pageNo} = this.state;
        const {offestSize} = this.state;

        let startIdx = (pageNo-1) * offestSize ; 

        for(let i=startIdx;i<startIdx+offestSize;i++){
            if(i>=maxSize)
                break;
            showArticles.push(getArticles[i]);
        }//for end
        this.setState({showArticles:showArticles});
    }//paintArticles() end

    async changePage(e,data) {
        const changePageNo = data.activePage;
        await this.setState({pageNo:changePageNo});
        this.paintArticles();
    }//changePage() end

    showContent(contents) {
        this.setState({modalState:true});
        this.setState({modalContent:contents});
    }//showContent() end

    closeModal() {
        this.setState({modalState:false});
    }//closeModal() end

    render(){
        const getArticles = this.state.getArticles;
        const showArticles = this.state.showArticles;
        const offestSize = this.state.offestSize;
        const showModal = this.state.modalState;
        const modalContent = this.state.modalContent;

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
        
            <Table.Body >
                {showArticles.map((article,index)=>{
                    return(
                    <Table.Row key={index} onClick={()=>this.showContent(article.contents)} >
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
            totalPages={Math.ceil(getArticles.length/offestSize)}
            onPageChange={(e,data)=>{this.changePage(e,data);}}
            />
        </div>
        <Modal 
            open = {showModal} //모달이 열려있니 닫혀있니? state로 관리되는 값이기때문에 변경시 열려진다!
            onClose = {this.closeModal} //모달이 닫힐만한 상황일때 뭐하니?  open의 값을 false로 바꿔준다!
            content= {modalContent} //모달에 표시될 내용
        />
        
      </div>
    }//render() end
}

export default TableModule;