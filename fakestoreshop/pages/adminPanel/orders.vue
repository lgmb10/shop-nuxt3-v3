<template>
  <DefaultLayout>
  <div class="p-4">
    <h1 class="text-4xl">Historique des commandes</h1>
    <OrderContainer v-if="orders" class="my-4 p-4 bg-gray-200 rounded-xl">
      <Order v-for="order in orders" :key="order" :date="new Date(order.date)" :user="order.userId" :id="order.id" :products="order.products" />
    </OrderContainer>
  </div>
    {{orders}}
  </DefaultLayout>

</template>

<script setup>
import DefaultLayout from "~/layouts/default.vue";

const {$api, $getAllOrders} = useNuxtApp()

const {data: orders} = await useAsyncData(() => $api($getAllOrders()));

</script>

<style scoped>

</style>