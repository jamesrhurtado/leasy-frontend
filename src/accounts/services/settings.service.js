import http from '@/core/services/http-common'
export class SettingsService{

    getByUserId(userId){
        return http.get(`users/${userId}/settings`)
    }

    create(data){
        return http.post("users/settings", data);
    }

    update(id, data){
        return http.put(`user/settings/${id}`, data)
    }

    //additional action (not neccesary)
    delete(id){
        return http.delete(`/reports/${id}`)
    }
}