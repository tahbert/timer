// import { DataTypeValidator } from "@linkse/fe-utils"

interface Params {
    id: string
    parentId: string
    name: string
    type: string
    order: number
    isDone: boolean
    children: Array<EngTopicModel>
}

export class EngTopicModel {
    id: string
    parentId: string
    name: string
    type: string
    order: number
    isDone: boolean
    children: Array<EngTopicModel>

    protected constructor(params: Params) {
        this.id = params.id
        this.parentId = params.parentId
        this.name = params.name
        this.type = params.type
        this.order = params.order
        this.isDone = params.isDone
        this.children = params.children
    }

    public static fromJson(json?: Record<string, any>): EngTopicModel {
        return new EngTopicModel({
            id: json?.id || "",
            parentId: json?.parentId || "",
            name: json?.name || "unknown",
            type: json?.type || "file",
            order: json?.order || 1,
            isDone: json?.isDone || true,
            children: json?.children || ([] as Array<EngTopicModel>),
        })
    }
}
