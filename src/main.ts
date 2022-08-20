import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import CKEditor from '@ckeditor/ckeditor5-vue';
import './index.css'

/**Adding font-awsome-icon component */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**Import icons */
import { faBars, faXmark, faComment, faReply } from '@fortawesome/free-solid-svg-icons'

library.add(faBars, faXmark, faComment, faReply)

const pinia = createPinia()
const app = createApp(App)

app.component('font-icon', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.use(CKEditor)
app.mount('#app')
