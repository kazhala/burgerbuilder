import React from 'react';
import Aux from '../Aux/Aux';
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                    <Toolbar
                        showSideDrawer={this.sideDrawerShowHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                    <SideDrawer
                        show={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </div>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);