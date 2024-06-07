<template>
  <div class="bg-slate-100 rounded-lg flex items-center p-3">
    <img class="w-10 h-10 object-contain object-center" :src="product.image">
    <NuxtLink :to="'/singleProduct/' + product.id"><p class="pl-4">{{ product.title}}</p></NuxtLink>
    <div class="grow flex justify-end items-center gap-6">
      <p class="w-32 text-start">Prix : {{finalProductPrice}}€</p>
      <div class="flex gap-2 items-center">
        <p class="text-end">Quantité :</p>
        <input class="rounded-lg p-2 w-14 outline-none" type="number" min="1" v-model="inputQuantity" @change="changeQuantity()">
      </div>
      <Icon class="text-xl mr-2 cursor-pointer" name="ic:baseline-delete-forever" color="black"
            @click="modifyCart({'id': product.id, 'quantity':inputQuantity}, cartActions.REMOVE)"/>
    </div>
  </div>
</template>

<script setup>
import {modifyCart, useCart} from "~/composables/cart";

const props = defineProps({
  product: Object,
  quantity: Number,
});

const cartStore = useCart();
let inputQuantity = ref(props.quantity);
const finalProductPrice = computed(() => {
  return (props.product.price * props.quantity).toFixed(2);
})

function changeQuantity(){
  if (inputQuantity.value === "") inputQuantity.value = 1;
  modifyCart({'id': props.product.id, 'quantity':inputQuantity.value}, cartActions.SETQUANTITY)
}

</script>

<style scoped>

</style>