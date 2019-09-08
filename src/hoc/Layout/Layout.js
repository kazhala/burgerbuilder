import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
    const [showSideDrawer, setSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawer(false);
    }

    const sideDrawerShowHandler = () => {
        setSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <div>
                <Toolbar
                    showSideDrawer={sideDrawerShowHandler}
                    isAuth={props.isAuthenticated}
                />
                <SideDrawer
                    show={showSideDrawer}
                    closed={sideDrawerClosedHandler}
                    isAuth={props.isAuthenticated}
                />
            </div>
            <main className="content">
                {props.children}
            </main>
        </Aux>
    );
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);