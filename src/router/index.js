import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions,import/no-unresolved
import MainPage from '@/pages/MainPage';
// eslint-disable-next-line import/extensions,import/no-unresolved
import NotFoundPage from '@/pages/NotFoundPage';
// eslint-disable-next-line import/extensions,import/no-unresolved
import ProductPage from '@/pages/ProductPage';
// eslint-disable-next-line import/extensions,import/no-unresolved
import CartPage from '@/pages/CartPage';
// eslint-disable-next-line import/extensions,import/no-unresolved
import OrderPage from '@/pages/OrderPage';
// eslint-disable-next-line import/extensions
import OrderInfoPage from '@/pages/OrderInfoPage';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'order', component: OrderPage, path: '/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
  { name: 'notFound', component: NotFoundPage, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
