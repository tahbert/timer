// import { DataTypeValidator } from "@linkse/fe-utils"
import frequency from "@/assets/json/frequency.json"

interface Params {
    name: string
    topic: string
    path: string
    frequency: string
}

export class EngSearchModel {
    name: string
    topic: string
    path: string
    frequency: string

    protected constructor(params: Params) {
        this.name = params.name
        this.topic = params.topic
        this.path = params.path
        this.frequency = params.frequency
    }

    public static fromJson(json?: Record<string, any>): EngSearchModel {
        return new EngSearchModel({
            name: json?.name || "",
            topic: json?.topic || "",
            path: json?.path || "",
            frequency: json?.frequency || "",
        })
    }

    public get frequencyColor() {
        return frequency.find((el) => el.name === this.frequency)?.color
    }
}
