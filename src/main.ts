// vue
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// quasar
import { Quasar } from "quasar"
import "@quasar/extras/material-icons/material-icons.css"
import "quasar/dist/quasar.css"

import "./assets/main.css"

const app = createApp(App)

app.use(router)
app.use(Quasar, {})
app.mount("#app")
