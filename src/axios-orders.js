import axios from 'axios';

const instance = axios.create({
    baseURL: "https://burger-builder-d60fd.firebaseio.com/"
});


export default instance;