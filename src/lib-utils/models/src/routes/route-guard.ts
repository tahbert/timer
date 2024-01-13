import type { RouteGuardResultModel } from "./route-guard-result-model"

export abstract class RouteGuard {
    public abstract check(redirectParams: Record<string, string>): Promise<RouteGuardResultModel>
}
