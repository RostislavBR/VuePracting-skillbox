<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120"  alt="Название товара">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="amount > 1 ? decrementProduct(item.productId) : deleteProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count">

      <button type="button" aria-label="Добавить один товар" @click.prevent="incrementProduct(item.productId)">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} &#8381;
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteItem(item.productId)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>

// eslint-disable-next-line import/extensions,import/no-unresolved
import numberFormat from '@/helpers/numberFormat';
import { mapMutations } from 'vuex';

export default {
  props: ['item'],
  filters: { numberFormat },
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        if (Number.isInteger(value)) {
          this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
        } else {
          this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: 1 });
        }
      },
    },
  },
  watch: {

  },
  methods: {
    ...mapMutations({ incrementProduct: 'incrementCartProduct', decrementProduct: 'decrementCartProduct' }),
    deleteItem() {
      this.$store.dispatch('deleteCartProducts', this.item.productId);
    },
  },
};
</script>

<style scoped>

</style>
