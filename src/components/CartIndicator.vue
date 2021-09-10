<template>
  <router-link class="header__cart"  aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span class="header__count" aria-label="Количество товаров">{{ totalProducts }}</span>
  </router-link>
</template>

<script>
// eslint-disable-next-line import/extensions,import/no-unresolved
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ totalProducts: 'cartTotalProducts' }),
  },
};
</script>

<style scoped>

</style>
