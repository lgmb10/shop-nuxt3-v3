<template>
  <ClientOnly>
  <div class="w-full pt-10">
    <form class="flex-col justify-center items-center center bg-gray-200 mx-auto w-96 rounded-xl p-4"
          @submit.prevent="login()">
      <div class="mb-6 flex-col">
        <label class="block font-bold pb-2" for="username">Login</label>
        <input id="username" v-model="userName" autocomplete="username" class="rounded-lg w-full py-1 px-2 outline-none"
               required
               type="text"/>
      </div>
      <div class="flex-col">
        <label class="block font-bold pb-2" for="password">Mot de passe</label>
        <div class="flex items-center justify-center">
          <input id="password" v-model="password" autocomplete="current-password"
                 class="rounded-lg w-full py-1 px-2 outline-none"
                 required type="password"/>
          <button class="flex-col" type="button" @click="showPassword()">
            <Icon class="text-xl ml-2 pb-1" color="black" name="fa6-solid:eye"/>
          </button>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="rounded-lg bg-white block px-3 py-1 mt-6" type="submit">Se connecter</button>
      </div>
      <NuxtLink class="text-center block pt-3" to="/">Retourner à l'accueil</NuxtLink>
    </form>
  </div>
  </ClientOnly>
</template>

<script setup>
const {$apiAuth, $jwtAppRequest} = useNuxtApp();

let passwordInput;
let isPasswordVisible = false;
let userName = ref("");
let password = ref("");

onMounted(() => {
  passwordInput = document.getElementById("password")

})

function showPassword() {
  if (isPasswordVisible) {
    passwordInput.type = "password";
    isPasswordVisible = false;
  } else {
    passwordInput.type = "text";
    isPasswordVisible = true;
  }
}

async function login() {
  try {
    await useAsyncData(() => $apiAuth($jwtAppRequest(), {
      method: "POST",
      body: JSON.stringify({username: userName.value, password: password.value})
    }));


  } catch (e) {
    console.log(e);
  }
}

</script>

<style scoped>

</style>