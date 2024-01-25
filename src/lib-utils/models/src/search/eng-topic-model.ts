// import { DataTypeValidator } from "@linkse/fe-utils"
import frequency from "@/assets/json/frequency.json"

interface Params {
    id: string
    name: string
    topic: string
    path: string
    frequency: string
    keys: Array<string>
}

export class EngSearchModel {
    id: string
    name: string
    topic: string
    path: string
    frequency: string
    keys: Array<string>

    protected constructor(params: Params) {
        this.id = params.id
        this.name = params.name
        this.topic = params.topic
        this.path = params.path
        this.frequency = params.frequency
        this.keys = params.keys
    }

    public static fromJson(json?: Record<string, any>): EngSearchModel {
        return new EngSearchModel({
            id: json?.id || "",
            name: json?.name || "",
            topic: json?.topic || "",
            path: json?.path || "",
            frequency: json?.frequency || "",
            keys: json?.keys || ([] as Array<string>),
        })
    }

    public get frequencyColor() {
        return frequency.find((el) => el.name === this.frequency)?.color
    }
}
