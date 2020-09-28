import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom' ;
import Upload from './components/Upload.js';
import Board from './components/Board.js';
import TestBoard from './components/Test.js';
import styled from 'styled-components';


import {
  Container,
  Image, 
  Menu,
} from 'semantic-ui-react'
import logo from './image/logo.png'

const Wrapper = styled.div`
padding-top: 3.3em;  
`;

class App extends Component {

  render() {
    return (
      <Wrapper>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as={Link} to='/' header>
              <Image size='tiny' src={logo} style={{ marginRight: '1.0em' }} />
            </Menu.Item>
            <Menu.Item as={Link} to='/Upload'>Upload</Menu.Item>
            <Menu.Item as={Link} to='/Board'>Board</Menu.Item>
            <Menu.Item as={Link} to='/TestBoard'>TestBoard</Menu.Item>

          </Container>
        </Menu>
        <Switch>
          <Route path={['/Upload','/']} component={Upload} exact={true}/>
          <Route path="/Board" component={Board} />
          <Route path="/TestBoard" component={TestBoard} />

        </Switch>
      </Wrapper>
    );
  }
}

export default App;