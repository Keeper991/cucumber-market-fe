import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import ProductForm from "../pages/ProductForm";
import { history } from "../redux/configStore";
import styled from "styled-components";
import ProductDetail from "../pages/ProductDetail";
import Header from "../components/Header";
import ProductList from "../pages/ProductList";
import MyPage from "../pages/MyPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../shared/NotFound";

const App = () => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Header />
        <Content>
          <Switch>
            <Route path="/" component={ProductList} exact />
            <Route path="/login" component={Login} />
            <Route path="/me" component={MyPage} />
            <Route path="/register" component={Register} />
            <Route path="/create" component={ProductForm} />
            <Route path="/detail/:id" component={ProductDetail} />
            <Route path="/edit/:id" component={ProductForm} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </ConnectedRouter>
    </div>
  );
};

const Content = styled.section`
  padding: 0 1em;
  width: 100%;
`;

export default App;
