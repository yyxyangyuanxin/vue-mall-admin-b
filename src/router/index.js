import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/layout/Home.vue';
import Login from '@/views/layout/Login.vue';
import store from '@/store/index.js';
import permission from '@/utils/permission.js';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const asyncRouterMap = [{
    path: '/product',
    name: 'Product',
    meta: {
        title: '商品',
        icon: 'inbox',
        show: true
    },
    component: Home,
    children: [{
            path: 'list',
            name: 'ProductList',
            component: () =>
                import ('@/views/page/productList.vue'),
            meta: {
                title: '商品列表',
                icon: 'unordered-list',
                show: true
            }
        },
        {
            path: 'add',
            name: 'ProductAdd',
            component: () =>
                import ('@/views/page/productAdd.vue'),
            meta: {
                title: '添加商品',
                icon: 'file-add',
                show: true
            }
        },
        {
            path: 'edit/:id',
            name: 'ProductEdit',
            component: () =>
                import ('@/views/page/productAdd.vue'),
            meta: {
                title: '编辑商品',
                icon: 'file-add',
                show: false
            }
        },
        {
            path: 'category',
            name: 'Category',
            component: () =>
                import ('@/views/page/category.vue'),
            meta: {
                title: '类目管理',
                icon: 'project',
                show: true
            }
        }
    ]
}]
const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        redirect: '/statistics',
        meta: {
            title: '首页',
            icon: 'home',
            show: true
        },
        children: [{
            path: 'statistics',
            name: 'Statistics',
            component: () =>
                import ('@/views/page/statistics.vue'),
            meta: {
                title: '统计',
                icon: 'number',
                show: true
            }
        }]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            show: false
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
// 是否二次添加路由
let isAddRouter = false;
// 登录状态校验
router.beforeEach((to, from, next) => {
    if (to.path !== '/login') {
        if (store.state.user.username && store.state.user.appkey && store.state.user.role) {
            if (!isAddRouter) {
                const menuRoutes = permission(store.state.user.role, asyncRouterMap);
                store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
                    router.addRoutes(menuRoutes);
                });
                isAddRouter = true;
            }
            return next();
        }
        return next('/login');
    }
    return next();
})

export default router;