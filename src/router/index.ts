import Vue from 'vue'
import VueRouter from 'vue-router'

import KMeans from '@/components/KMeans.vue'
import PCA from '@/components/PCA.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/kmeans', component: KMeans },
    { path: '/pca', component: PCA }
  ]
})

