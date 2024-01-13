interface RouteGuardResultRouteModelParams {
    readonly name: string
    readonly queryParams: Record<string, string>
}

export class RouteGuardResultRouteModel {
    readonly name: string
    readonly queryParams: Record<string, string>

    protected constructor(params: RouteGuardResultRouteModelParams) {
        this.name = params.name
        this.queryParams = params.queryParams
    }

    public static createInstance(
        params: RouteGuardResultRouteModelParams
    ): RouteGuardResultRouteModel {
        return new RouteGuardResultRouteModel({
            name: params.name,
            queryParams: params.queryParams,
        })
    }
}
