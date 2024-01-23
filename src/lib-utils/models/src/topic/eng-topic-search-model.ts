// import { DataTypeValidator } from "@linkse/fe-utils"

interface Params {
    name: string
    frequency: string
}

export class EngTopicSearchModel {
    name: string
    frequency: string

    protected constructor(params: Params) {
        this.name = params.name
        this.frequency = params.frequency
    }

    public static fromJson(json?: Record<string, any>): EngTopicSearchModel {
        return new EngTopicSearchModel({
            name: json?.name || "",
            frequency: json?.frequency || "",
        })
    }
}
