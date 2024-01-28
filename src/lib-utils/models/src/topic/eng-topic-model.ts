// import { DataTypeValidator } from "@linkse/fe-utils"
import { EngTopicSearchModel } from "./eng-topic-search-model"

interface Params {
    id: string
    parentId: string
    name: string
    displayName?: string
    type: string
    order: number
    count: number
    path: string
    isDone: boolean
    search?: Array<EngTopicSearchModel>
    children: Array<EngTopicModel>
}

export class EngTopicModel {
    id: string
    parentId: string
    name: string
    displayName?: string
    type: string
    order: number
    count: number
    path: string
    isDone: boolean
    search?: Array<EngTopicSearchModel>
    children: Array<EngTopicModel>

    protected constructor(params: Params) {
        this.id = params.id
        this.parentId = params.parentId
        this.name = params.name
        this.displayName = params.displayName
        this.type = params.type
        this.order = params.order
        this.count = params.count
        this.path = params.path
        this.isDone = params.isDone
        this.search = params.search
        this.children = params.children
    }

    public static fromJson(json?: Record<string, any>): EngTopicModel {
        return new EngTopicModel({
            id: json?.id || "",
            parentId: json?.parentId || "",
            name: json?.name || "",
            displayName: json?.displayName || "",
            type: json?.type || "file",
            order: json?.order || 1,
            count: json?.count || 0,
            path: json?.path || 1,
            isDone: json?.isDone || true,
            search: json?.search || ([] as Array<EngTopicSearchModel>),
            children: json?.children || ([] as Array<EngTopicModel>),
        })
    }

    public get isVerified() {
        return this.name.includes("[verified]")
    }

    public get isSafe() {
        return this.name.includes("[safe]")
    }
}
