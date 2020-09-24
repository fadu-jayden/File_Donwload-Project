import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';

class TableModule extends Component{

    constructor(){
        super();
        this.state={

        }
    }//cons end

    render(){
        return   <Table celled singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>TITLE</Table.HeaderCell>
            <Table.HeaderCell>WRITER</Table.HeaderCell>
            <Table.HeaderCell>CREATED DATE</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>

          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>배고픈 딘의 김밥천국 여행</Table.Cell>
            <Table.Cell>딘</Table.Cell>
            <Table.Cell>2019.9.1</Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    }//render() end
}

export default TableModule;