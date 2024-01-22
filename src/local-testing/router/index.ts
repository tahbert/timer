import { createRouter, createWebHistory } from "vue-router"

import { engDetailsView, engHomeView, engLayout } from "@/lib"
import { appRouteDefinitions } from "@/lib-utils"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "",
            redirect: { name: appRouteDefinitions.home.name },
        },
        {
            path: "",
            component: engLayout,
            children: [
                {
                    path: appRouteDefinitions.home.path,
                    name: appRouteDefinitions.home.name,
                    components: {
                        default: engHomeView,
                    },
                    meta: {
                        title: appRouteDefinitions.home.title,
                        guards: [],
                        redirectParams: appRouteDefinitions.home.redirectParams,
                    },
                },
                {
                    path: appRouteDefinitions.details.path,
                    name: appRouteDefinitions.details.name,
                    components: {
                        default: engDetailsView,
                    },
                    meta: {
                        title: appRouteDefinitions.details.title,
                        guards: [],
                        redirectParams: appRouteDefinitions.details.redirectParams,
                    },
                },
            ],
        },
    ],
})

export default router
