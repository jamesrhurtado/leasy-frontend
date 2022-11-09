import http from '@/core/services/http-common'
export class SettingsService{

    async getByUserId(userId){
        const response = await http.get(`users/${userId}/settings`)
        if (response.status !== 200) return false;
        return response;
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