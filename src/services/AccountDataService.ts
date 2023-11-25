//import http from '@/config/http-common';
import GeneralSettings from '@/config/general';
import axios  from 'axios';

class AccountDataService {
    static refreshing = false;
    static baseURL = GeneralSettings.baseURL;

    static login(email: string, password: string): Promise<any> {
        return axios.post(this.baseURL + 'auth/login', {
            email,
            password,
        });
    }

    static logout(token: string | null): Promise<any> {
        return axios.post(this.baseURL + 'auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }

    static getUsers(): Promise<any> {
        return axios.get('/users');
    }
}

export default AccountDataService;
