import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '@/components/HelloWorld';
import Page from '@/components/pages/page';
import child from '@/components/pages/child';
import child2 from '@/components/pages/child2';
import child3 from '@/components/pages/child3';
import Menu from '@/components/pages/menu';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/dashboard';
import Products from '@/components/pages/Products';
import Orders from '@/components/pages/Orders';
import Coupons from '@/components/pages/Coupons';

Vue.use(VueRouter);

export default new VueRouter({
    linkExactActiveClass:'active',
    routes:[
        {
            path:'*',
            redirect:'login',
        },
        // {
        //     name:'首頁',
        //     path:'/',
        //     component:Home,
        //     meta: { requiresAuth: true },
        // },
        {
            name:'Login',
            path:'/login',
            component:Login,
        },
        {
            name:'Dashboard',
            path:'/admin',
            component:Dashboard,
            children:[
                {
                    name:'Products',
                    path:'products',
                    component:Products,
                     meta: { requiresAuth: true },
                }, 
                {
                    name:'Orders',
                    path:'orders',
                    component:Orders,
                }, 
                {
                    name:'Coupons',
                    path:'coupons',
                    component:Coupons,
                },
            ]
        },
        {
            // name:'分頁',
            path:'/page',
            // component:Page,
            components:{
                default:Page,
                menu:Menu,
            },
            children:[
                {
                    name:'卡片1',
                    path:'',
                    component:child,
                },
                {
                    name:'卡片2',
                    path:'child2',
                    component:child2,
                },
                {
                    name:'卡片3',
                    path:'child3',
                    component:child3,
                },
            ]
        },
    ]
})



