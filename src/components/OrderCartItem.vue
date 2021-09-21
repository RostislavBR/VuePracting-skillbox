<template>
    <li class="cart__order">
      <h3>{{ product.title }}</h3>
      <b>{{ product.price }} ₽</b>
      <span>Артикул: {{product.id }}</span>
    </li>
</template>

<script>

export default {
  props: ['product'],
};

</script>

<style scoped>

</style>
