<template>
  <div class="p-3 bg-slate-300 flex justify-between items-center">
    <h1>
      <NuxtLink to="/">FakeStoreShop</NuxtLink>
    </h1>
    <div class="flex items-center">
      <div v-if="isUser">
        Bonjour {{ user.firstname }}
      </div>
      <div v-else>
        <NuxtLink class="inline-block bg-white rounded-lg p-2 text-center mx-5 cursor-pointer" to="/login">
          Se connecter
        </NuxtLink>
      </div>
      <div v-if="isSuperAdmin">
        <NuxtLink class="inline-block bg-white rounded-lg p-2 text-center mx-5 cursor-pointer" to="/adminPanel/orders">
          Back Office
        </NuxtLink>
      </div>
      <div v-if="isUser">
        <button
            class="inline-block bg-white rounded-lg p-2 text-center mr-5 cursor-pointer flex justify-center items-center"
            @click="logout()">
          <Icon class="text-xl" color="black" name="fa6-solid:power-off"/>
        </button>
      </div>
      <NuxtLink class="relative" to="/cart">
        <Icon class="text-xl mr-2" color="black" name="ic:twotone-shopping-cart"/>
        <span
            v-if="cartStoreQuantity !== null && cartStoreQuantity > 0"
            class="text-white flex justify-center items-center block text-center text-xs absolute rounded-full top-0 right-0 bg-red-600 w-4 h-4 leading-none">
        {{ cartStoreQuantity }}
      </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {useCart, useCartQuantity} from "~/composables/cart";
import {useCookie} from "#app";
import {checkUserRole, getInfoFromJWT} from "~/utils/auth";

const cartStore = useCart();
const cartStoreQuantity = useCartQuantity();
let token;
let user = null;
let isSuperAdmin = ref(false);
let isUser = ref(false);

onMounted(() => {
  try {
    cartStore.value = JSON.parse(localStorage.getItem("cart"));
    countCartQuantity(cartStore, cartStoreQuantity);

    token = useCookie('user').value;
    if (token) user = getInfoFromJWT(token);

    if (user !== null) {
      isUser.value = true;
      isSuperAdmin.value = checkUserRole(user.roles, 'ROLE_SUPER_ADMIN');
    } else {
      isUser.value = false;
      isSuperAdmin.value = false;
    }
  } catch (e) {
    console.log(e)
  }
})

function logout() {
  useCookie("user").value = null;
  return navigateTo("/login")
}


</script>

<style scoped>


</style>