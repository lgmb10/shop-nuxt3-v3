import {navigateTo, useCookie} from "#app";
import {getInfoFromJWT} from "~/utils/auth.js";
import router from "#app/plugins/router.js";

export default defineNuxtPlugin(async () => {
    const token = useCookie("user").value;
    const baseUrl = useRuntimeConfig().public.apiUrl

    const api = $fetch.create({
        baseURL: baseUrl,
        onRequest({request, options, error}) {
            const route = useRoute().fullPath

            if (route.includes("adminPanel")) {
                if (token && token !== "noToken") {

                    const user = getInfoFromJWT(token);
                    if (!user || isJWTExpired(user.exp) || !checkUserRole(user.roles, "ROLE_SUPER_ADMIN")) {
                        useCookie("user").value = null;
                        return navigateTo("/login")
                    }
                }else{
                    return navigateTo("/login")
                }
            }

        },
        async onResponseError({response}) {
            if (response.status === 401) {
                await navigateTo('/login')
            }
        }
    })

    function getAllProducts() {
        return `/products`;
    }

    function getOneProduct(id) {
        return `/products/${id}`;
    }

    function getAllProductsByCategory(category, limit) {
        return `/products/category/${category}?limit=${limit}`;
    }

    function getMenProducts(limit) {
        return getAllProductsByCategory("men's%20clothing", limit)
    }

    function getWomenProducts(limit) {
        return getAllProductsByCategory("women's%20clothing", limit)
    }

    function getAllOrders(limit) {
        return `/carts?limit=${limit}`;
    }

    // Expose to useNuxtApp().$api
    return {
        provide: {
            api,
            getAllProducts,
            getOneProduct,
            getAllProductsByCategory,
            getMenProducts,
            getWomenProducts,
            getAllOrders,

        }
    }
})