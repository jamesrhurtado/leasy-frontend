import http from '@/core/services/http-common'
import { useAuthStore } from '../../stores/auth.store.js';

export class AuthService{

    register(data){
        return http.post("users/sign-up", data);
    }

    async login(user){
        const response = await http.post(`users/sign-in`, user); 
        if (response.status !== 200) return false;
        const authStore = useAuthStore()
        return authStore.login(response)
    }



    getById(id) {
        return http.get(`users/${id}`);
    }
    getReports(id) {
        return http.get(`users/${id}/reports`);
    }

    update(id, data) {
        return http.put(`users/${id}`, data);
    }
    delete(id) {
        return http.delete(`users/${id}`);
    }
}