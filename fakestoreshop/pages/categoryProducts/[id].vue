<template>
  <DefaultLayout>
    <div>
      <div class="flex justify-start items-center gap-4 px-5 py-3 flex-wrap bg-slate-100">
        <select v-model="selectedSort" class="outline-none rounded-lg bg-white p-2" @change="sortProducts()">
          <option value="">Trier</option>
          <option value="price">Prix croissant</option>
          <option value="-price">Prix décroissant</option>
        </select>
        <div class="flex items-center gap-2">
          <input id="star" v-model="selectedFilter" name="filter" type="radio" value="rating" @change="sortProducts()">
          <label class="leading-none" for="star">Meilleure note</label>
        </div>
        <div class="flex items-center gap-2">
          <input id="notice" v-model="selectedFilter" name="filter" type="radio" value="" @change="sortProducts()">
          <label class="leading-none" for="notice">Nombre d'avis</label>
        </div>
        <p @click="reset = true">réinitialiser</p>
      </div>

      <ProductContainer v-if="sortedProducts">
        <ProductCard v-for="product in sortedProducts" :id="product.id" :image="product.image"
                     :price="product.price" :rating="product.rating" :title="product.title"/>
      </ProductContainer>
    </div>
  </DefaultLayout>
</template>

<script setup>
import {dynamicSort} from "~/composables/cart";
import {useRoute} from "nuxt/app";
import DefaultLayout from "~/layouts/default.vue";

const {$api, $getAllProductsByCategory} = useNuxtApp();
const route = useRoute();


const {data: products} = await useAsyncData(() => $api($getAllProductsByCategory(route.params.id)));
const sortedProducts = ref([]);
const selectedSort = ref("");
const selectedFilter = ref("");

function sortProducts() {
  if (selectedSort.value !== null || selectedSort.value !== "") sortedProducts.value.sort(dynamicSort(selectedSort.value));
  if (selectedFilter.value !== null || selectedFilter.value !== "") sortedProducts.value.sort(dynamicSort(selectedFilter.value));
}

onMounted(() => {
  sortedProducts.value = products.value;
});

</script>

<style scoped>

</style>