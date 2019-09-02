import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout} />
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>

    )
  }
}

export default App;
