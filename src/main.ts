import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import BlotFormatter from 'quill-blot-formatter'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import './index.css'

/**Adding font-awsome-icon component */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/**Import icons */
import { faBars, faXmark, faComment, faReply, faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
library.add(
    faBars, faXmark, faComment, faReply, faHome, faEnvelope, faPhone,
    faFacebookF, faTwitter, faYoutube, faInstagram
)

/**Richt Text Editor global configuration */
Quill.register('modules/blotFormatter', BlotFormatter)      // register module to resize image
const globalOptions = {
    theme: 'snow',
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],        // toggled buttons
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
            ],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ["link"],
        ],
        blotFormatter: {}
    },
    placeholder: 'Escribe un comentario...'
}
QuillEditor.props.globalOptions.default = () => globalOptions   // set global options for editor

const pinia = createPinia()
const app = createApp(App)

app.component('font-icon', FontAwesomeIcon)
app.component('QuillEditor', QuillEditor)
app.use(router)
app.use(pinia)
app.mount('#app')
