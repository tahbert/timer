// vue
import { createApp } from "vue"
import App from "@/local-testing/App.vue"
import router from "@/local-testing/router"

// quasar
import { Quasar, LoadingBar } from "quasar"
import "@quasar/extras/material-icons/material-icons.css"
import "@quasar/extras/material-icons-outlined/material-icons-outlined.css"
import "quasar/dist/quasar.css"

// css
import "./assets/styles/main.css"

const app = createApp(App)
app.use(router)
app.use(Quasar, {
    plugins: { LoadingBar },
    config: {
        loadingBar: {
            color: "positive",
            size: "2px",
            position: "top",
        },
    },
})
app.mount("#app")
