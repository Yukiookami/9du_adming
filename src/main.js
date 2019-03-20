// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import gndHome from './components/gndHome'
import gndNav from './components/gndNav'
import gndEx from './components/gndEx'
import gndKaisha from './components/gndKaisha'
import gndMember from './components/gndMember'
import gndWork from './components/gndWork'
import gndJoin from './components/gndJoin'
import gndWorkDetil from './components/gndWorkDetil'
import login from './components/login'
import changePassword from './components/changePassword'
import gndNewsDetil from './components/gndNewsDetil'
import gndNews from './components/gndNews'

Vue.use(iView)
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'hash',
  routes: [
    {path: '/', component: gndHome, name: gndHome},
    {path: '/nav', component: gndNav},
    {path: '/gndEx', component: gndEx, name: gndEx},
    {path: '/gndKaisha', component: gndKaisha},
    {path: '/gndMember', component: gndMember},
    {path: '/gndWork', component: gndWork},
    {path: '/gndJoin', component: gndJoin},
    {path: '/gndWorkDetil', component: gndWorkDetil},
    {path: '/login', component: login},
    {path: '/changePassword', component: changePassword},
    {path: '/gndNews', component: gndNews},
    {path: '/gndNewsDetil', component: gndNewsDetil}
  ]
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
