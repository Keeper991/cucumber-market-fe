import React from 'react';

import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from '../redux/configStore';

import ProductList from "../pages/ProductList";
import MyPage from "../pages/MyPage";

import Button from "../elements/Button";

const App = () => {

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Route path="/" exact component={ProductList} />
        <Route path="/me" exact component={MyPage} />
      </ConnectedRouter>
      <Button
        bg='black'
        is_float
        text='+'
        _onClick={() => {
          history.push("/");
        }}
      ></Button>
    </div>
  );
};



export default App;
