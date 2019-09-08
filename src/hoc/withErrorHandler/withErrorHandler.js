import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [errorState, closeModalHandler] = useHttpErrorHandler(axios);
        return (
            <Aux>
                <Modal show={errorState} modalClosed={closeModalHandler}>
                    {errorState ? errorState.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux >
        );
    }
}








export default withErrorHandler;