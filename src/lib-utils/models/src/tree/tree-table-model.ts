interface TreeTableModelParams<T> {
    item: T
    children: Array<TreeTableModel<T>>
    level: number
    id: string
    label: string
    activeIndex?: string
}

export class TreeTableModel<T> {
    readonly item: T
    children: Array<TreeTableModel<T>>
    level: number
    id: string
    label: string
    visible: boolean
    activeIndex?: string

    protected constructor(params: TreeTableModelParams<T>) {
        this.item = params.item
        this.children = params.children
        this.level = params.level
        this.id = params.id
        this.label = params.label
        this.visible = true
        this.activeIndex = params.activeIndex
    }

    public static createInstance<T>(params: TreeTableModelParams<T>): TreeTableModel<T> {
        return new TreeTableModel<T>({
            item: params.item,
            children: params.children,
            level: params.level,
            id: params.id,
            label: params.label,
            activeIndex: params.activeIndex,
        })
    }
}
