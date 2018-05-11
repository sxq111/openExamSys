import axios from 'axios';

export const AxiosPost = (url, data) => {
    return () => {
        return axios.post(url, data)
            .then(response => ({ response }))
            .catch(error => ({ error }))
    }
}

export const AxiosRequest = (method,url, data = {}, headers = {}) => {
    return () => {
        return axios({
            method: method,
            baseURL: '',
            url: url,
            headers: headers,
            data:data
        })
            .then(response => ({ response }))
            .catch(error => ({ error }))
        // return axios.post(url, {
        //     data:data,
        //     headers: {
        //         id: id,
        //         token: pwd_cry
        //     }
        // })
    }
}