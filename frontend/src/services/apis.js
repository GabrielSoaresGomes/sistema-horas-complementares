import axios from "axios";

const {REACT_APP_BACKEND_BASE_URL} = process.env;

class Apis {
    async get(url) {
        try {
            const fullUrl = `${REACT_APP_BACKEND_BASE_URL}${url}`;
            const headers = this.headers();
            const response = await axios.get(fullUrl, {headers});
            if (response.statusText === 'OK') {
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                }
                throw new Error(response.headers.get('message'));
            }
        } catch (error) {
            console.log(error);
        }
    }

    async delete(url) {
        const fullUrl = `${REACT_APP_BACKEND_BASE_URL}${url}`;
        const headers = this.headers();
        const response = await axios.delete(fullUrl, {headers});
        if (response.statusText === 'OK') {
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            throw new Error(response.headers.get('message'));
        }
    }

    async put(url, userData) {
        const fullUrl = `${REACT_APP_BACKEND_BASE_URL}${url}`;
        const headers = this.headers();
        const response = await axios.put(fullUrl, userData, {headers});
        if (response.statusText === 'OK') {
            if (response.status >= 200 && response.status < 300) {
                return response.data;
            }
            throw new Error(response.headers.get('message'));
        }
    }

    headers(header={}) {
        // Pegar token de autenticação;
        return {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            // Authorization: `TOKEN`,
            ...header
        };
    }
}

const ApiInstance = new Apis();
export default ApiInstance;