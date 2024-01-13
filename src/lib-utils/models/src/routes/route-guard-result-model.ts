import { RouteGuardResultRouteModel } from "./route-guard-result-route-model"

interface RouteGuardResultModelParams {
    success: boolean
    route: RouteGuardResultRouteModel
}

export class RouteGuardResultModel {
    readonly success: boolean
    readonly route: RouteGuardResultRouteModel

    protected constructor(params: RouteGuardResultModelParams) {
        this.success = params.success
        this.route = params.route
    }

    public static createSuccess(): RouteGuardResultModel {
        return new RouteGuardResultModel({
            success: true,
            route: RouteGuardResultRouteModel.createInstance({ name: "", queryParams: {} }),
        })
    }

    public static createFail(
        params: Pick<RouteGuardResultModelParams, "route">
    ): RouteGuardResultModel {
        return new RouteGuardResultModel({
            success: false,
            route: params.route,
        })
    }
}
