import { createRouter, createWebHistory } from "vue-router"
import { lBaseLayout } from "@linkse/vue-components-package"

import {
    qimInstanceListView,
    qimInstanceListToolbar,
    qimInstanceDetailsView,
    qimInstanceDetailsToolbar,
    qimInstanceManageView,
    qimInstanceCreateToolbar,
    qimInstanceEditToolbar,
    qimInstanceDataCollectionSourceCallView,
    qimInstanceDataCollectionInspectionSessionView,
    qimInstanceDataCollectionInspectionView,
    qimInstanceDataCollectionEvaluationView,
    qimInstanceDataCollectionToolbar,
    qimDataSourceListView,
    qimDataSourceListToolbar,
    qimDataSourceDetailsView,
    qimDataSourceDetailsToolbar,
    qimDataImportListView,
    qimDataImportListToolbar,
    qimDataImportDetailsView,
    qimDataImportDetailsToolbar,
    qimDataSourceModifyView,
    qimDataSourceModifyToolbar,
    qimEvaluationFlowListView,
    qimEvaluationFlowListToolbar,
    qimEvaluationFlowDetailsView,
    qimEvaluationFlowDetailsToolbar,
    qimInspectionPlanListView,
    qimInspectionPlanListToolbar,
    qimInspectionPlanDetailsView,
    qimInspectionPlanDetailsToolbar,
} from "@/lib"
import sidebar from "@/lib/components/ui/sidebar.vue"

import { qimRouteDefinitions } from "@/lib-utils"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "",
            redirect: { name: qimRouteDefinitions.qimInstance.list.name },
        },
        {
            path: "/qim",
            component: lBaseLayout,
            children: [
                // instance
                {
                    path: qimRouteDefinitions.qimInstance.list.path,
                    name: qimRouteDefinitions.qimInstance.list.name,
                    meta: {
                        title: qimRouteDefinitions.qimInstance.list.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.qimInstance.list.redirectParams,
                    },
                    components: {
                        default: qimInstanceListView,
                        toolbar: qimInstanceListToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.qimInstance.create.path,
                    name: qimRouteDefinitions.qimInstance.create.name,
                    meta: {
                        title: qimRouteDefinitions.qimInstance.create.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.qimInstance.create.redirectParams,
                    },
                    components: {
                        default: qimInstanceManageView,
                        toolbar: qimInstanceCreateToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.qimInstance.details.path,
                    name: qimRouteDefinitions.qimInstance.details.name,
                    meta: {
                        title: qimRouteDefinitions.qimInstance.details.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.qimInstance.details.redirectParams,
                    },
                    components: {
                        default: qimInstanceDetailsView,
                        toolbar: qimInstanceDetailsToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.qimInstance.edit.path,
                    name: qimRouteDefinitions.qimInstance.edit.name,
                    meta: {
                        title: qimRouteDefinitions.qimInstance.edit.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.qimInstance.edit.redirectParams,
                    },
                    components: {
                        default: qimInstanceManageView,
                        toolbar: qimInstanceEditToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataCollection.sourceCall.path,
                    name: qimRouteDefinitions.dataCollection.sourceCall.name,
                    meta: {
                        title: qimRouteDefinitions.dataCollection.sourceCall.title,
                        guards: [],
                        redirectParams:
                            qimRouteDefinitions.dataCollection.sourceCall.redirectParams,
                    },
                    components: {
                        default: qimInstanceDataCollectionSourceCallView,
                        toolbar: qimInstanceDataCollectionToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataCollection.inspectionSession.path,
                    name: qimRouteDefinitions.dataCollection.inspectionSession.name,
                    meta: {
                        title: qimRouteDefinitions.dataCollection.inspectionSession.title,
                        guards: [],
                        redirectParams:
                            qimRouteDefinitions.dataCollection.inspectionSession.redirectParams,
                    },
                    components: {
                        default: qimInstanceDataCollectionInspectionSessionView,
                        toolbar: qimInstanceDataCollectionToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataCollection.inspection.path,
                    name: qimRouteDefinitions.dataCollection.inspection.name,
                    meta: {
                        title: qimRouteDefinitions.dataCollection.inspection.title,
                        guards: [],
                        redirectParams:
                            qimRouteDefinitions.dataCollection.inspection.redirectParams,
                    },
                    components: {
                        default: qimInstanceDataCollectionInspectionView,
                        toolbar: qimInstanceDataCollectionToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataCollection.evaluation.path,
                    name: qimRouteDefinitions.dataCollection.evaluation.name,
                    meta: {
                        title: qimRouteDefinitions.dataCollection.evaluation.title,
                        guards: [],
                        redirectParams:
                            qimRouteDefinitions.dataCollection.evaluation.redirectParams,
                    },
                    components: {
                        default: qimInstanceDataCollectionEvaluationView,
                        toolbar: qimInstanceDataCollectionToolbar,
                        sidebar: sidebar,
                    },
                },
                // data source
                {
                    path: qimRouteDefinitions.dataSource.list.path,
                    name: qimRouteDefinitions.dataSource.list.name,
                    meta: {
                        title: qimRouteDefinitions.dataSource.list.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataSource.list.redirectParams,
                    },
                    components: {
                        default: qimDataSourceListView,
                        toolbar: qimDataSourceListToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataSource.details.path,
                    name: qimRouteDefinitions.dataSource.details.name,
                    meta: {
                        title: qimRouteDefinitions.dataSource.details.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataSource.details.redirectParams,
                    },
                    components: {
                        default: qimDataSourceDetailsView,
                        toolbar: qimDataSourceDetailsToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataSource.create.path,
                    name: qimRouteDefinitions.dataSource.create.name,
                    meta: {
                        title: qimRouteDefinitions.dataSource.create.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataSource.create.redirectParams,
                    },
                    components: {
                        default: qimDataSourceModifyView,
                        toolbar: qimDataSourceModifyToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataSource.edit.path,
                    name: qimRouteDefinitions.dataSource.edit.name,
                    meta: {
                        title: qimRouteDefinitions.dataSource.edit.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataSource.edit.redirectParams,
                    },
                    components: {
                        default: qimDataSourceModifyView,
                        toolbar: qimDataSourceModifyToolbar,
                        sidebar: sidebar,
                    },
                },
                // data import
                {
                    path: qimRouteDefinitions.dataImport.list.path,
                    name: qimRouteDefinitions.dataImport.list.name,
                    meta: {
                        title: qimRouteDefinitions.dataImport.list.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataImport.list.redirectParams,
                    },
                    components: {
                        default: qimDataImportListView,
                        toolbar: qimDataImportListToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.dataImport.details.path,
                    name: qimRouteDefinitions.dataImport.details.name,
                    meta: {
                        title: qimRouteDefinitions.dataImport.details.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.dataImport.details.redirectParams,
                    },
                    components: {
                        default: qimDataImportDetailsView,
                        toolbar: qimDataImportDetailsToolbar,
                        sidebar: sidebar,
                    },
                },
                // evaluation flow
                {
                    path: qimRouteDefinitions.evaluationFlow.list.path,
                    name: qimRouteDefinitions.evaluationFlow.list.name,
                    meta: {
                        title: qimRouteDefinitions.evaluationFlow.list.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.evaluationFlow.list.redirectParams,
                    },
                    components: {
                        default: qimEvaluationFlowListView,
                        toolbar: qimEvaluationFlowListToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.evaluationFlow.details.path,
                    name: qimRouteDefinitions.evaluationFlow.details.name,
                    meta: {
                        title: qimRouteDefinitions.evaluationFlow.details.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.evaluationFlow.details.redirectParams,
                    },
                    components: {
                        default: qimEvaluationFlowDetailsView,
                        toolbar: qimEvaluationFlowDetailsToolbar,
                        sidebar: sidebar,
                    },
                },
                // inspection plan
                {
                    path: qimRouteDefinitions.inspectionPlan.list.path,
                    name: qimRouteDefinitions.inspectionPlan.list.name,
                    meta: {
                        title: qimRouteDefinitions.inspectionPlan.list.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.inspectionPlan.list.redirectParams,
                    },
                    components: {
                        default: qimInspectionPlanListView,
                        toolbar: qimInspectionPlanListToolbar,
                        sidebar: sidebar,
                    },
                },
                {
                    path: qimRouteDefinitions.inspectionPlan.details.path,
                    name: qimRouteDefinitions.inspectionPlan.details.name,
                    meta: {
                        title: qimRouteDefinitions.inspectionPlan.details.title,
                        guards: [],
                        redirectParams: qimRouteDefinitions.inspectionPlan.details.redirectParams,
                    },
                    components: {
                        default: qimInspectionPlanDetailsView,
                        toolbar: qimInspectionPlanDetailsToolbar,
                        sidebar: sidebar,
                    },
                },
            ],
        },
    ],
})

export default router
