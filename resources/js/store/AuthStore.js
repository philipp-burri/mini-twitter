import { defineStore } from "pinia";
import axios from "axios";

export const authClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true, // required to handle the CSRF token
});

export const useAuthStore = defineStore("AuthStore", {
    state: () => {
        return {
            user: null,
        };
    },

    actions: {
        async register(credentials) {
            try {
                await authClient.get("/sanctum/csrf-cookie");
                let response = await authClient.post(
                    "/api/register",
                    credentials
                );
                return response;
            } catch (error) {
                this.user = null;
                throw error;
            }
        },
        async login(credentials) {
            try {
                await authClient.get("/sanctum/csrf-cookie");
                let response = await authClient.post("/api/login", credentials);
                return response;
            } catch (error) {
                this.user = null;
                throw error;
            }
        },
        async getAuthUser() {
            try {
                await authClient.get("/sanctum/csrf-cookie");
                let response = await authClient.get("/api/user");
                this.user = response.data;
                return response;
            } catch (error) {
                this.user = null;
                console.error(error);
            }
        },

        async logout() {
            try {
                await authClient.get("/sanctum/csrf-cookie");
                let response = await authClient.post("/api/logout");
                this.user = null;
                return response;
            } catch (error) {
                this.user = null;
                throw error;
            }
        },
    },

    // get Elements from store
    getters: {
        authUser: (state) => state.user,
    },
});