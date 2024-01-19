// import { DataheaderValidator } from "@linkse/fe-utils"

interface Params {
    name: string
    color: string
    isActive: boolean
}

export class EngFrequencyModel {
    name: string
    color: string
    isActive: boolean

    protected constructor(params: Params) {
        this.name = params.name
        this.color = params.color
        this.isActive = params.isActive
    }

    public static fromJson(json?: Record<string, any>): EngFrequencyModel {
        return new EngFrequencyModel({
            name: json?.name || "",
            color: json?.color || "",
            isActive: json?.isActive || true,
        })
    }
}
