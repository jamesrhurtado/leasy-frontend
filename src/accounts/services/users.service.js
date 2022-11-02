import http from '@/core/services/http-common'


export class UsersService{
    getById(id) {
        return http.get(`users/${id}`);
    }
    getReports(id) {
        return http.get(`users/${id}/reports`);
    }
    create(data) {
        return http.post("users", data);
    }
    update(id, data) {
        return http.put(`users/${id}`, data);
    }
    delete(id) {
        return http.delete(`users/${id}`);
    }
}