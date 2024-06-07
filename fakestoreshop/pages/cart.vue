<template>
  <DefaultLayout>
    <div class="m-4">
      <h1 class="pb-4 font-medium text-2xl">Panier</h1>
      <div v-if="listProduct.length > 0" class="flex flex-col gap-2">
        <CartItem
            v-for="product in cartStore" :key="product"
            :product="listProduct[listProduct.findIndex(x => x.id === product.id)]"
            :quantity="product.quantity"
        />
        <p class="text-end">Prix Total : {{ calculatedFinalPrice(cartStore, listProduct) }}€</p>

      </div>
      <p v-else>Aucun article dans le panier</p>
    </div>
  </DefaultLayout>
</template>

<script setup>
import {useCart, calculatedFinalPrice} from "~/composables/cart";
import DefaultLayout from "~/layouts/default.vue";
import {useAsyncData} from "#app";

const {$api, $getOneProduct} = useNuxtApp();
const cartStore = useCart();
const listProduct = ref([]);
const finalPrice = ref(0);

const promises = []
//let response;


onMounted(async () => {

  // cartStore.value.forEach((x) => {
  //   promises.push($api($getOneProduct(x.id)))
  // })

  // const response = await useAsyncData(async () => {
  //   return await Promise.all(promises)
  // });
  //
  // console.log(response)


  console.log(cartStore.value)
  for (let i = 0; i< cartStore.value.length; i++) {
    let response = await useAsyncData(() => $api($getOneProduct(cartStore.value[i].id)));
    listProduct.value[i] = response.data.value;
  }
  console.log(listProduct.value)

  // const promises = cartStore.value.map(async (x) => {
  //   return useAsyncData(() => $api($getOneProduct(x.id)));
  //
  // });

  // response = await Promise.all(promises)
  //listProduct.value = data.map(x => x.data.value)


})


// cartStore.value.forEach((x) => {
//   promises.push($api.getOneProduct(x.id))
// })


</script>

<style scoped>

</style>

<!--const promises = []-->
<!--cartStore.value.forEach((x) => {-->
<!--promises.push(useAsyncData(() => $api($getOneProduct(x.id))))-->
<!--})-->
<!--const response = await Promise.all(promises)-->
<!--//const test = await useAsyncData(() => $api($getOneProduct(1)));-->
<!--console.log(response)-->
<!--listProduct.value = response.map(x => x.data.value)-->