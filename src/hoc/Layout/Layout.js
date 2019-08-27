import React from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
    state = {
        showSideDrawer: false,
    }
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false,
        })
    }

    sideDrawerShowHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <div>
                    <Toolbar showSideDrawer={this.sideDrawerShowHandler} />
                    <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
                </div>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;