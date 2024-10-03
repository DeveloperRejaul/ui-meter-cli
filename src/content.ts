import type { IConfigContent } from "./types"

export const configContent = (params: IConfigContent) => {
    return `export default {
    schema: "https://github.com/DeveloperRejaul/ui-meter",
    path:{
        components:"${params.components_path}",
        utils:'${params.utils_path}'
    }
}`
} 