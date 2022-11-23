import http from '@/core/services/http-common'
export class SettingsService{

    async getByUserId(userId){
        try{
            const response = await http.get(`users/${userId}/settings`)
            if (response.status !== 200) return false;
            return response;
        }catch(err){
            return false;
        }
    }

    async create(data){
        try {
            return await http.post("users/settings", data);
        } catch (err) {
            return false;
        }
    }

    update(id, data){
        return http.put(`users/settings/${id}`, data)
    }

    //additional action (not neccesary)
    delete(id){
        return http.delete(`/reports/${id}`)
    }
}