import axios from 'axios';

const dataLoader = axios.create({
    baseURL: 'https://epi-qura-backend-server-red.vercel.app',
     timeout: 10000,
})

const useDataLoader = () => {
    return dataLoader
};

export default useDataLoader;