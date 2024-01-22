// import { DataheaderValidator } from "@linkse/fe-utils"
import frequency from "@/assets/json/frequency.json"

interface Params {
    id: string
    name: string
    order: number
    icon: string
    header: string
    frequency: string
    partOfSpeech: string
    usage: string
    region: string
    definition: string
    isEnabled: boolean
    examples: Array<string>
    children: Array<EngContentModel>
}

export class EngContentModel {
    id: string
    name: string
    order: number
    icon: string
    header: string
    frequency: string
    partOfSpeech: string
    usage: string
    region: string
    definition: string
    isEnabled: boolean
    examples: Array<string>
    children: Array<EngContentModel>

    protected constructor(params: Params) {
        this.id = params.id
        this.name = params.name
        this.order = params.order
        this.icon = params.icon
        this.header = params.header
        this.frequency = params.frequency
        this.partOfSpeech = params.partOfSpeech
        this.usage = params.usage
        this.region = params.region
        this.definition = params.definition
        this.isEnabled = params.isEnabled
        this.examples = params.examples
        this.children = params.children
    }

    public static fromJson(json?: Record<string, any>): EngContentModel {
        return new EngContentModel({
            id: json?.id || "",
            name: json?.name || "",
            order: json?.order || 1,
            icon: json?.icon || "",
            header: json?.header || "",
            frequency: json?.frequency || "",
            partOfSpeech: json?.partOfSpeech || "",
            usage: json?.usage || "",
            region: json?.region || "",
            definition: json?.definition || "",
            isEnabled: json?.isEnabled || true,
            examples: json?.examples || ([] as Array<string>),
            children: json?.children || ([] as Array<EngContentModel>),
        })
    }

    // level
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

    // frequency
    public get frequencyColor() {
        return frequency.find((el) => el.name === this.frequency)?.color
    }
}
