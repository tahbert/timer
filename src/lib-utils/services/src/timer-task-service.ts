import { TimerTaskModel } from "@/lib-utils"

export class TimerTaskService {
    private static instance?: TimerTaskService

    private constructor() {
        if (TimerTaskService.instance instanceof TimerTaskService) {
            return TimerTaskService.instance
        }
        TimerTaskService.instance = this
    }

    public static getInstance(): TimerTaskService {
        return new TimerTaskService()
    }

    list: Array<TimerTaskModel> = []
}
