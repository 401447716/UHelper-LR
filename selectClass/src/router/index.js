import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/CreateSelect'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/CreateSelect',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/CreateSelect.vue'),
                    meta: { title: '发布选课' }
                },
                {
                    path: '/ShowClassData',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/ShowClassData.vue'),
                    meta: { title: '展示选课信息' }
                },
                {
                    path: '/ModifyClass',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/ModifyClass.vue'),
                    meta: { title: '修改选课信息' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
