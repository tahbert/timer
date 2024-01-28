// import { DataTypeValidator } from "@linkse/fe-utils"

interface Params {
    name: string
    frequency: string
    contentPath: string
}

export class EngTopicSearchModel {
    name: string
    frequency: string
    contentPath: string

    protected constructor(params: Params) {
        this.name = params.name
        this.frequency = params.frequency
        this.contentPath = params.contentPath
    }

    public static fromJson(json?: Record<string, any>): EngTopicSearchModel {
        return new EngTopicSearchModel({
            name: json?.name || "",
            frequency: json?.frequency || "",
            contentPath: json?.contentPath || "",
        })
    }
}
