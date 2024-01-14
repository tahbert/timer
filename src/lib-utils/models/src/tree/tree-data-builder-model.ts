interface TreeDataBuilderModelParams<T> {
    parentId: string
    id: string
    node: T
    label: string
}

export class TreeDataBuilderModel<T> {
    parentId: string
    id: string
    node: T
    label: string

    protected constructor(params: TreeDataBuilderModelParams<T>) {
        this.parentId = params.parentId
        this.id = params.id
        this.node = params.node
        this.label = params.label
    }

    public static createInstance<T>(params: TreeDataBuilderModelParams<T>) {
        return new TreeDataBuilderModel<T>({
            parentId: params.parentId,
            id: params.id,
            node: params.node,
            label: params.label,
        })
    }
}
