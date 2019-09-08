import { useEffect, useState } from 'react';

export default httpClient => {
    const [errorState, setErrorState] = useState(null);
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setErrorState(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(response => response, error => {
        setErrorState(error);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor, httpClient.interceptors.request, httpClient.interceptors.response]);

    const closeModalHandler = () => {
        setErrorState(null);
    }
    return [errorState, closeModalHandler]
}