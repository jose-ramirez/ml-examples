import Vue from 'vue'
import VueRouter from 'vue-router'

import KMeans from '@/components/KMeans.vue'
import LogisticRegression from '@/components/LogisticRegression.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/kmeans', component: KMeans },
    { path: '/logreg', component: LogisticRegression }
  ]
})

