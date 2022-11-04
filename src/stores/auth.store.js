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
        returnUrl: null
    }),
    actions: {
        async login(user) {
            try {
                const authenticatedUser = await http.get(`${baseUrl}?email=${user.email}`); 
                if(authenticatedUser.data[0].password === user.password){
                    this.user = {...authenticatedUser.data[0], token: 'fake-jwt-token'}
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    return user;
                }else{
                    console.log("Email or password is incorrect")
                }  
            } catch (error) {
                console.log(error)
                alert("")               
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        }
    }
});
