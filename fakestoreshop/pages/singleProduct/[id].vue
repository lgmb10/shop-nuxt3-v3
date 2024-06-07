<template>
  <DefaultLayout>
    <div>
      <div class="flex max-w-5xl mx-auto p-5 gap-8 bg-gray-200 rounded-2xl m-4">
        <img :src="product.image" class="w-80 h-80 object-contain object-center">
        <div class="flex flex-col">
          <h3 class="font-semibold text-xl">{{ product.title }} </h3>
          <p class="text-4xl">{{ product.price }} €</p>
          <div class="flex justify-between w-full pt-6">
            <p>Note : {{ product.rating.rate }} </p>
            <p>Avis : {{ product.rating.count }}</p>
          </div>
          <p class="py-6">{{ product.description }}</p>
          <div class="grow flex flex-end items-center justify-end">
            <div class="flex gap-2 items-center pr-4">
              <p class="text-end">Quantité :</p>
              <input v-model="inputQuantity" class="rounded-lg p-2 w-14 outline-none" min="1" type="number">
            </div>
            <p class="text-center inline-block bg-green-500 rounded-lg px-3 py-1 text-white cursor-pointer"
               @click="modifyCart({'id': product.id, 'quantity':inputQuantity}, cartActions.ADD)">
              Ajouter au panier</p>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup>
import {useRoute} from "nuxt/app";
import {modifyCart} from "/composables/cart";
import DefaultLayout from "~/layouts/default.vue";


const {$api, $getOneProduct} = useNuxtApp();
const route = useRoute();

const {data: product} = await useAsyncData(() => $api($getOneProduct(route.params.id)));
let inputQuantity = ref(1);


</script>

<style scoped>

</style>