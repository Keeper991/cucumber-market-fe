import { ConnectedRouter } from "connected-react-router";
import { Route } from "react-router-dom";
import ProductForm from "../pages/ProductForm";
import { history } from "../redux/configStore";
import styled from "styled-components";
import ProductList from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";

const App = () => {
  return (
    <div className="App">
      <Content>
        <ConnectedRouter history={history}>
          <Route path="/" component={ProductList} exact />
          <Route path="/create" component={ProductForm} />
          <Route path="/detail/:id" component={ProductDetail} />
          <Route path="/edit/:id" component={ProductForm} />
        </ConnectedRouter>
      </Content>
    </div>
  );
};

const Content = styled.section`
  padding: 0 1em;
  width: 100%;
`;

export default App;
