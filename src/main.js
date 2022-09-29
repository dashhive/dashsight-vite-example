import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.provide('DASHSIGHT_BASE_URL', import.meta.env.INSIGHT_BASE_URL || 'https://insight.dash.org')
app.provide('DASH_ADDR_LENGTH', 34)
// Pulled from https://github.com/dashhive/dashsight.js/blob/main/examples/addrs.txt
app.provide('testAddresses', 'XmaroZwvCKjsYQQVdCQP2BuWnnMGxWLCGJ XmCyQ6qARLWXap74QubFMunngoiiA1QgCL XaxrcNUS6MrAfsvXNF2s24eChFVKabU6gP XdaWS6gScUjxbFdA8WSFZbeBK2mpGDr6uc XgfQUxiwo7BnTpwxAqpmVJSJwtJHdRCJd2 Xhn6eTCwW94vhVifhshyTeihvTa7LcatiM XnepcKMViJE3bR4ggFkAfLGgqBSr6EjA8z Xp3pqfnYUYLif4SqWFU3Fuv4hJJQRen1ud Xsa1WM9FbRxqSfBxjfFVjLfQ5zinK5NHio Xw2zuXP3VwoRKMoV7cA9TQpJ5bnbCsw13Q XxrK9XH5L3mGCyirz26RpGpCQcJB3v39Lk'
.split(' '))

app.mount('#app')
