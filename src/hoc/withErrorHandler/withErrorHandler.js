import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [errorState, setErrorState] = useState(null);
        const reqInterceptor = axios.interceptors.request.use(req => {
            setErrorState(null);
            return req;
        });
        const resInterceptor = axios.interceptors.response.use(response => response, error => {
            setErrorState(error);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const closeModalHandler = () => {
            setErrorState(null);
        }


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