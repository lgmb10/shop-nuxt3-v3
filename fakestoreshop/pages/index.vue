<template>
  <DefaultLayout>
    <div class="flex flex-col justify-center items-center pb-10">
      <ProductContainer>
        <ProductCard v-for="product in menProducts" :id="product.id" :image="product.image" :price="product.price"
                     :rating="product.rating" :title="product.title"/>
      </ProductContainer>
      <NuxtLink class="bg-slate-300 rounded-lg px-3 py-2" to="/categoryProducts/men's%20clothing">Afficher plus de
        produits
      </NuxtLink>
      <ProductContainer>
        <ProductCard v-for="product in womenProducts" :id="product.id" :image="product.image" :price="product.price"
                     :rating="product.rating" :title="product.title"/>
      </ProductContainer>
      <NuxtLink class="bg-slate-300 rounded-lg px-3 py-2" to="/categoryProducts/women's%20clothing">Afficher plus de
        produits
      </NuxtLink>
    </div>
  </DefaultLayout>
</template>

<script setup>
import ProductContainer from "../components/ProductContainer";
import DefaultLayout from "~/layouts/default.vue";


const { $api, $getMenProducts, $getWomenProducts } = useNuxtApp()

const {data: menProducts} = await useAsyncData(() => $api($getMenProducts('4')))

const {data: womenProducts} = await useAsyncData(() => $api($getWomenProducts('4')))

</script>

<style scoped>

</style>