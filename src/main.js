import { createApp } from 'vue'
import gapi from 'vue3-google-oauth2'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const clientId = process.env.VUE_APP_CLIENT_ID || '18495362772-rftckb2iktu6689uurl8nbi06vr2cq7s.apps.googleusercontent.com'

app.use(router).mount('#app')
app.use(
    gapi,
    {
        clientId,
        scope: 'email',
        prompt: 'consent',
        fetch_basic_profile: false
    }
)
