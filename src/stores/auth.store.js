import { defineStore } from 'pinia';
import http from '../core/services/http-common';

//import { fetchWrapper } from '@/helpers';
import { useRouter, RouterLink } from "vue-router";

const baseUrl = "http://localhost:3000/users";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        token: null,
        returnUrl: null
    }),
    actions: {
        login(user) {
            try {
                if(user.token){
                    this.user = {user}
                    this.token = user.token
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    return true
                }else{
                    console.log("Email or password is incorrect")
                    return false
                }  
            } catch (error) {
                console.log(error)  
                return false        
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});
