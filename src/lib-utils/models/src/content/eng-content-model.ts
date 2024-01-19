// import { DataheaderValidator } from "@linkse/fe-utils"
import frequency from "@/assets/json/frequency.json"

interface Params {
    id: string
    name: string
    icon?: string
    header: string
    body?: string
    frequency?: string
    definition?: string
    examples?: Array<string>
    children?: Array<EngContentModel>
}

export class EngContentModel {
    id: string
    name: string
    icon?: string
    header: string
    body?: string
    frequency?: string
    definition?: string
    examples?: Array<string>
    children?: Array<EngContentModel>

    protected constructor(params: Params) {
        this.id = params.id
        this.name = params.name
        this.icon = params.icon
        this.header = params.header
        this.body = params.body
        this.frequency = params.frequency
        this.definition = params.definition
        this.examples = params.examples
        this.children = params.children
    }

    public static fromJson(json?: Record<string, any>): EngContentModel {
        return new EngContentModel({
            id: json?.id || "",
            name: json?.name || "",
            icon: json?.icon || "",
            header: json?.header || "",
            body: json?.body || "",
            frequency: json?.frequency || "",
            definition: json?.definition || "",
            examples: json?.examples || ([] as Array<string>),
            children: json?.children || ([] as Array<EngContentModel>),
        })
    }

    public get isRoot() {
        return this.header === "root"
    }

    public get isGroup() {
        return this.header === "group"
    }

    public get isBranch() {
        return this.header === "branch"
    }

    public get hasExamples() {
        if (this.examples) {
            return this.examples?.length > 0
        }
        return false
    }

    public get frequencyColor() {
        return frequency.find((el) => el.name === this.frequency)?.color
    }
}
