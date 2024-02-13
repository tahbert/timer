// import { DataheaderValidator } from "@linkse/fe-utils"

interface Params {
    id: string
    parentId: string
    name: string
    time: string
    children: Array<TimerTaskModel>
}

export class TimerTaskModel {
    id: string
    parentId: string
    name: string
    time: string
    children: Array<TimerTaskModel>

    protected constructor(params: Params) {
        this.id = params.id
        this.parentId = params.parentId
        this.name = params.name
        this.time = params.time
        this.children = params.children
    }

    public static fromJson(json?: Record<string, any>): TimerTaskModel {
        return new TimerTaskModel({
            id: json?.id || "",
            parentId: json?.parentId || "",
            name: json?.name || "",
            time: json?.time || "",
            children: json?.children || ([] as Array<TimerTaskModel>),
        })
    }
}
