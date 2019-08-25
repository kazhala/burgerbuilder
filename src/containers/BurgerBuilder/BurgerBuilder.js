import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends React.Component {
    render() {
        return (
            <Aux>
                <div><Burger /></div>
                <div>Build controls</div>
            </Aux>

        );
    }
}

export default BurgerBuilder;