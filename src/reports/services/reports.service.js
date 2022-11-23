import http from '@/core/services/http-common';

export class ReportsService{
    getAll(){
        return http.get("/reports")
    }

    getAllByUserId(userId){
        return http.get(`users/${userId}/reports`)
    }

    getById(id){
        return http.get(`/reports/${id}`)
    }

    create(data){
        return http.post("/reports", data);
    }

    update(id, data){
        return http.put(`/reports/${id}`, data)
    }

    delete(id){
        return http.delete(`/reports/${id}`)
    }
}