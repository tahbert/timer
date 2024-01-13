import { RouteDefinitionModel } from "@/lib-utils/models"

export const appRouteDefinitions = {
    home: RouteDefinitionModel.createInstance({
        name: "engmindmap-home-view",
        path: "engmindmap/home",
        title: "Engmidnmap Home",
        permissions: [],
        redirectParams: {
            next: "engmindmap-home-view",
        },
    }),
}