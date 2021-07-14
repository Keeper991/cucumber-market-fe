import React from 'react';

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from '../redux/configStore';

import Button from "../elements/Button";
import Header from '../components/Header';

import ProductList from "../pages/ProductList";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Register from '../pages/Register';
import ChatList from '../pages/ChatList';
import ChattingRoom from '../pages/ChattingRoom';

const App = () => {

  return (
    <div className="App">

      <ConnectedRouter history={history}>
        <Header />
        <Route path="/" exact component={ProductList} />
        <Route path="/me" exact component={MyPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/chatlist" exact component={ChatList} />
        <Route path="/chattingroom" exact component={ChattingRoom} />
      </ConnectedRouter>

    </div>
  );
};

export default App;
