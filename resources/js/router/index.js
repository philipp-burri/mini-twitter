import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const isAuthChecking = ref(false);

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "home",
            meta: { requiresAuth: true }, //leitet zur Login Seite um wenn User nicht authentiziert ist.
           

            component: () => import("../views/HomeView.vue"),
        },
        {
            path: "/dashboard",
            name: "dashboard",
            // route level code-splitting
            // this generates a separate chunk (Dashboard.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import("../views/DashboardView.vue"),
            // die Meta-Informationen verwenden wir um den Zugriff zu schützen
            meta: { requiresAuth: true },
        },
        {
            // Hier brauchen wir keine Meta-Informationen, da diese Route für nicht authentifizierte User zugänglich sein soll.
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            // Hier brauchen wir keine Meta-Informationen, da diese Route für nicht authentifizierte User zugänglich sein soll.
            path: "/register",
            name: "register",
            component: () => import("../views/RegisterView.vue"),
        },
        {

            path: "/post/create",
            name: "post-create",
            component: () => import("../views/PostCreate.vue"),

        },

        {

            path: "/post/edit/:id",
            name: "post-edit",
            component: () => import("../views/PostEdit.vue"),


        },
   

        {
            path: '/post/:id',
            name: 'single-post',
            component: () => import('../views/SingleTweet.vue'),
            meta: { requiresAuth: true },
        },
        

        {
            path: '/settings',
            name: 'settings',
            component: () => import('../views/SettingsPage.vue'),
        }
    ],
});

// navigation guard
router.beforeEach(async (to, from, next) => {
    const { getAuthUser } = useAuthStore();
    const { authUser } = storeToRefs(useAuthStore());
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (reqAuth && !authUser.value && !isAuthChecking.value) {
        isAuthChecking.value = true;
        try {
            await getAuthUser();
        } catch (error) {
            console.error('Error checking authentication:', error);
            // Optionally handle specific error cases here
        } finally {
            isAuthChecking.value = false;
        }
    }

    if (reqAuth && !authUser.value) {
        return next("/login");
    }

    // Redirect authenticated users away from login/register pages
    if (authUser.value && (to.path === '/login' || to.path === '/register')) {
        return next('/dashboard');
    }

    next();
});

export default router;