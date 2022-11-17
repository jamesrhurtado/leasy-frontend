import http from '@/core/services/http-common'
import { useAuthStore } from '../../stores/auth.store.js';

export class AuthService{

    async register(data){
        try {
            await http.post("users/sign-up", data);
            return true;
        } catch (err) {
            return false;
        }
    }

    async login(user){
        try {
            const response = await http.post(`users/sign-in`, user);
            const authStore = useAuthStore()
            authStore.login(response.data)
            if(response.status !== 200) return false;
            return true;
        } catch (err) {
            return false;
        }
    }

    getReports(id) {
        return http.get(`users/${id}/reports`);
    }
    //additional actions (currently not used)
    update(id, data) {
        return http.put(`users/${id}`, data);
    }
    delete(id) {
        return http.delete(`users/${id}`);
    }
}