import React, {Component} from 'react';
import SearchModule from './Search.js';
import axios from 'axios';
import '../css/board.css';
import TableModule from './TableModule.js';
import qs from 'qs';
import {Modal} from 'semantic-ui-react';


class Board extends Component{

    constructor(){
        super();
        this.state={
            title:'',   //제목
            writer:'',  //저자
            size:10,    //한번에 보여줄 게시물 수
            page:0,     //현재 페이지
            totalCount:10, //전체 게시물 수
            articles:[], //게시물 데이터
            
            modalState:false,
            modalContent:'',
            queryId:undefined,
        }

        this.showContent = this.showContent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showModalByQueryId = this.showModalByQueryId.bind(this);
        this.changeArticleId = this.changeArticleId.bind(this);
    }

    async componentDidMount(){
        this.getPages();
        
        const query = qs.parse(this.props.location.search,{
            ignoreQueryPrefix : true //'?' 생략
        });

        await this.setState({queryId:query.id});
        if(this.state.queryId !== undefined){
            this.showModalByQueryId();
        }//if end
    }

    async getPages(){
        const page = this.state.page;
        const size = this.state.size;
        const title = this.state.title;
        const writer = this.state.writer;

        let datas = [];
        let total = 0 ;
        await axios.get(`http://10.10.13.137:9000/ae/boardlist?page=${page}&size=${size}&title=${title}&writer=${writer}`,
        {
            headers: {
                Accept: 'application/json'
            }
        })
        .then((response)=>{
            console.log(`page=${page} size=${size} title=${title} writer=${writer}`)
            datas = response.data.boards;
            total = response.data.totalCount;
            this.setState({articles:datas});
            this.setState({totalCount:total});
        });
    }//getPages() end

    

    async showModalByQueryId(){
        // console.log('getDetail 실행');
        await axios.get(`http://10.10.13.137:9000/ae/details?id=${this.state.queryId}`).
        then((response)=>{
            this.setState({modalContent:response.data.contents});
            // console.log(response.data);
        }).then(()=>{
            this.showContent(this.state.modalContent);
        });
    }//getDetail() end

    changePageNo = async (pageNo) => {
        console.log('함수호출');
        await this.setState({page:pageNo*this.state.size});
        this.getPages(); 
    }//changePageNo() end

    changeArticleId = async (id) => {
        await this.setState({queryId:id});
        this.showModalByQueryId();
    }//changeArticle() end

    
    showContent(contents) {
        this.setState({modalState:true});
        this.setState({modalContent:contents});
    }//showContent() end

    closeModal() {
        this.setState({modalState:false});
    }//closeModal() end

    render(){

        let pageInfo = {page:this.state.page, 
            size:this.state.size, 
            articles:this.state.articles, 
            totalCount:this.state.totalCount
        };

        let pageFunction = {changePageNo : this.changePageNo, changeArticleId:this.changeArticleId};
        
        
        const showModal = this.state.modalState;
        const modalContent = this.state.modalContent;

        return <div id="layout_board">
            <SearchModule></SearchModule>
            <TableModule pageInfo={pageInfo} pageFunction={pageFunction}></TableModule>
            
            <Modal 
            open = {showModal} //모달이 열려있니 닫혀있니? state로 관리되는 값이기때문에 변경시 열려진다!
            onClose = {this.closeModal} //모달이 닫힐만한 상황일때 뭐하니?  open의 값을 false로 바꿔준다!
            content= {modalContent} //모달에 표시될 내용
    />
        </div>;
    }//render() end
}

export default Board;