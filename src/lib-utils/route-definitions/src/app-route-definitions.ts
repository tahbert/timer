import { RouteDefinitionModel } from "@/lib-utils/models"

export const appRouteDefinitions = {
    home: RouteDefinitionModel.createInstance({
        name: "timer-home-view",
        path: "timer",
        title: "Timer",
        permissions: [],
        redirectParams: {
            next: "timer-home-view",
        },
    }),
}
