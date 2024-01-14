import {
    TreeDataBuilderModel,
    TreeTableModel,
    // SelectTreeOptionModel,
    // SelectOptionModel,
} from "@/lib-utils"

export class TreeDataBuilder {
    private constructor() {}

    public static getInstance() {
        return new TreeDataBuilder()
    }

    public build<T>(nodes: Array<TreeDataBuilderModel<T>>): Array<TreeTableModel<T>> {
        const parentNodes = nodes
            .filter((el) => el.parentId.length === 0)
            .map((el) =>
                TreeTableModel.createInstance<T>({
                    level: 0,
                    id: el.id,
                    item: el.node,
                    children: [],
                    label: el.label,
                })
            )
        return this.recursiveBuild(parentNodes, nodes)
    }

    private recursiveBuild<T>(
        parentNodes: Array<TreeTableModel<T>>,
        nodes: Array<TreeDataBuilderModel<T>>
    ): Array<TreeTableModel<T>> {
        parentNodes.forEach((node) => {
            node.children = nodes
                .filter((el) => el.parentId === node.id)
                .map((el) =>
                    TreeTableModel.createInstance<T>({
                        level: node.level + 1,
                        item: el.node,
                        id: el.id,
                        children: [],
                        label: el.label,
                    })
                )

            if (node.children.length > 0) {
                this.recursiveBuild(node.children, nodes)
            }
        })

        return parentNodes
    }

    // public buildSelectTree(
    //     nodes: Array<TreeDataBuilderModel<SelectOptionModel>>
    // ): Array<SelectTreeOptionModel> {
    //     const tree = this.build<SelectOptionModel>(nodes)
    //     const result: Array<SelectTreeOptionModel> = []
    //     this.recursiveSelectBuild(tree, result)
    //     return result
    // }

    // private recursiveSelectBuild(
    //     list: Array<TreeTableModel<SelectOptionModel>>,
    //     result: Array<SelectTreeOptionModel>
    // ): Array<SelectTreeOptionModel> {
    //     list.forEach((item) => {
    //         result.push(
    //             SelectTreeOptionModel.createInstance({
    //                 label: item.item.label,
    //                 value: item.item.value,
    //                 inactive: item.item.inactive,
    //                 level: item.level,
    //             })
    //         )

    //         if (item.children.length > 0) {
    //             this.recursiveSelectBuild(item.children, result)
    //         }
    //     })

    //     return result
    // }
}
