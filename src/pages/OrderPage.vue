<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/" class="breadcrumbs__link" href="index.html">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link to="/cart" class="breadcrumbs__link" href="cart.html">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link to="/order" class="breadcrumbs__link">
            Оформление заказа
          </router-link>
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
      <CartLoader v-show="getStatus"/>
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя"/>
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес"/>
            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон" placeholder="Введите ваш телефон"/>
            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" placeholder="Введите ваш Email"/>
            <BaseFormTextarea  title="Комментарий к заказу" v-model="formData.comment" :error="formError.comment" placeholder="Ваши пожелания"/>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card"/>
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <OrderCartItem v-for="{product} in products" :key="product.productId" :product="product"/>
          </ul>


          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ totalProducts }}</b> товара на сумму <b>{{ totalPriceProducts }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>

// eslint-disable-next-line import/extensions,import/no-unresolved
import BaseFormText from '@/components/BaseFormText';
// eslint-disable-next-line import/extensions,import/no-unresolved
import BaseFormTextarea from '@/components/BaseFormTextarea';
import { mapGetters, mapMutations } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
// eslint-disable-next-line import/extensions
import OrderCartItem from '@/components/OrderCartItem';
// eslint-disable-next-line import/extensions
import CartLoader from '@/components/CartLoader';
import axios from 'axios';
import { API_BASE_URL } from '../config';


export default {
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  components: {
    BaseFormText, BaseFormTextarea, OrderCartItem, CartLoader,
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts', totalProducts: 'cartTotalProducts', totalPriceProducts: 'cartTotalPrice', getStatus: 'getStatusLoading',
    }),
  },
  filters: {
    numberFormat,
  },
  methods: {
    ...mapMutations({ statusLoading: 'setStatusLoading' }),
    order() {
      this.formError = {};
      this.formErrorMessage = '';
      this.statusLoading(true);

      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
          this.statusLoading(false);
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>

<style scoped>

</style>
