import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import router from './router'
import { pt_BR } from '../src/locales/pt_BR.js'
import { en } from '../src/locales/en.js'
import { es } from '../src/locales/es.js'

//Configuração para internacionalização com o i18n:
const languages = {
    pt_BR,
    en,
    es
}
const i18n = createI18n({
    locale: 'pt_BR',
    fallbackLocale: 'pt_BR',
    messages: languages,
})

//COnstrução do aplicativo usando router e i18n:
createApp(App).use(i18n).use(router).mount('#app')
