<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" to="/">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{ totalProducts }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list" v-if="products.length > 0">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>
          <CartLoader v-show="statusLoading"/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice | numberFormat }} &#8381;</span>
          </p>

          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
// eslint-disable-next-line import/extensions,import/no-unresolved
import numberFormat from '@/helpers/numberFormat';
// eslint-disable-next-line import/extensions,import/no-unresolved
import CartItem from '@/components/CartItem';
import { mapGetters } from 'vuex';
// eslint-disable-next-line import/no-unresolved,import/extensions
import CartLoader from '@/components/CartLoader';

export default {
  filters: {
    numberFormat,
  },
  components: {
    CartItem,
    CartLoader,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalProducts: 'cartTotalProducts', statusLoading: 'getStatusLoading',
    }),
  },
};
</script>

<style scoped>

</style>
