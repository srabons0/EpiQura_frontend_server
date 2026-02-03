import axios from 'axios';

const dataLoader = axios.create({
    baseURL: 'https://epiqura-backend-server.onrender.com',
     timeout: 10000,
})

const useDataLoader = () => {
    return dataLoader
};

export default useDataLoader;