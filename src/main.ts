import { createApp } from 'vue'
import './style/style.scss'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const home = () => import('./components/router/home.vue')
const mapDisplay = () => import('./components/router/adventuremap.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: home },
        { path: `/adventuremap`, component: mapDisplay, props: true },
    ],
    linkExactActiveClass: 'active-link'
})

createApp(App).use(router).mount('body')
