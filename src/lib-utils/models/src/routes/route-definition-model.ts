interface RouteDefinitionModelParams {
    name: string
    path: string
    title: string
    permissions: Array<string>
    redirectParams: Record<string, string>
}

export class RouteDefinitionModel {
    readonly name: string
    readonly path: string
    readonly title: string
    readonly permissions: Array<string>
    readonly redirectParams: Record<string, string>

    protected constructor(params: RouteDefinitionModelParams) {
        this.name = params.name
        this.path = params.path
        this.title = params.title
        this.permissions = params.permissions
        this.redirectParams = params.redirectParams
    }

    public static createInstance(params: RouteDefinitionModelParams): RouteDefinitionModel {
        return new RouteDefinitionModel({
            name: params.name,
            path: params.path,
            title: params.title,
            permissions: params.permissions,
            redirectParams: params.redirectParams,
        })
    }
}
