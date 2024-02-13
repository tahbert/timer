import { createRouter, createWebHistory } from "vue-router"

import { engHomeView } from "@/lib"
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
            ],
        },
    ],
})

export default router
