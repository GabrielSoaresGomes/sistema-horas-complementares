const {REACT_APP_BACKEND_BASE_URL} = process.env;

class ApiUser {
    async get(url) {
        const fullUrl = `${REACT_APP_BACKEND_BASE_URL}${url}`;
        const headers = this.headers();
        const response = await fetch(fullUrl, {method: 'GET', headers});
        if (response.ok) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
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

const ApiInstanceUser = new ApiUser();
export default ApiInstanceUser;