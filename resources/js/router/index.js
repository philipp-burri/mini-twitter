import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/AuthStore";
import { storeToRefs } from 'pinia';


const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: "/",
            name: "home",
            redirect: "/login"
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
            path: "/create",
            name: "create",

            component: () => import("../views/CreateView.vue"),
            meta: { requiresAuth: true},
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

        }
    ],
});

// navigation guard
router.beforeEach(async (to, from, next) => {
    const { getAuthUser } = useAuthStore();
    const { authUser } = storeToRefs(useAuthStore());
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (reqAuth && !authUser.value) {
        console.log('logRouter');
        await getAuthUser();
        if (!authUser.value) return next("/login");
        next();
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;