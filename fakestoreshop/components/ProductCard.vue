<template>
  <div class="bg-slate-100 p-3 rounded-lg w-80 flex flex-col justify-between">
    <div class="pb-3">
      <NuxtLink class="block flex justify-between items-center flex-col " :to="'/singleProduct/'+id ">
        <img class="w-48 h-48 object-contain object-center" :src="image">
        <p>{{ title }} </p>
        <p>{{ price }} €</p>
        <div class="flex justify-between w-full">
          <p>note : {{ rating.rate }} </p>
          <p>avis : {{ rating.count }}</p>
        </div>
      </NuxtLink>
    </div>
    <p class="text-center inline-block bg-green-500 rounded-lg px-3 py-1 text-white cursor-pointer" @click="modifyCart({'id': id, 'quantity':quantity}, cartActions.ADD)">
      Ajouter au panier</p>
  </div>
</template>

<script setup>

const props = defineProps({
  title: String,
  price: Number,
  image: String,
  rating: Object,
  id: Number,
  quantity: {
    default: 1
  }
})

</script>

<style scoped>

</style>