import axios from 'axios';

const dataLoader = axios.create({
    baseURL: 'http://localhost:3000'
})

const useDataLoader = () => {
    return dataLoader
};

export default useDataLoader;