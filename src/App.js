import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
//import asyncComponent from './hoc/asyncComponent/asyncComponent';
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const App = props => {
  const { onTryAutoSignin } = props;
  useEffect(() => {
    onTryAutoSignin();
  }, [onTryAutoSignin]);

  let route = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Redirect from="/orders" to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    route = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" component={BurgerBuilder} />
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Suspense fallback={<p>loading...</p>}>
            {route}
          </Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
