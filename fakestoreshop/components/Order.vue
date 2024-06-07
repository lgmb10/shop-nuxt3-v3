<template>
  <div class="rounded-lg bg-white mb-4 p-4">
    <p class="text-lg font-semibold">Numéro de commande : {{id}}</p>
    <div class="flex justify-between py-2">
      <p>Utilisateur : {{ user }}</p>
      <p>Date : {{ date.toLocaleDateString("fr") }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <div v-for="product in products" :key="product" class="flex justify-between gap-2 gap bg-gray-100 rounded-lg py-1 px-2">
        <p>id produit : {{product.productId}}</p>
        <p>quantité : {{product.quantity}}</p>
      </div>
    </div>
  </div>

</template>

<script setup>
const {$api} = useNuxtApp()
const props = defineProps({
  id: Number,
  date: Date,
  user: Number,
  products : [Object]
});

</script>


<style scoped>

</style>