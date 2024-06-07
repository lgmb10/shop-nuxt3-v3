import {navigateTo, useCookie} from "#app";
import {getInfoFromJWT} from "~/utils/auth.js";

export default defineNuxtPlugin( async () => {
    const baseUrl = useRuntimeConfig().public.apiAuthUrl

    const apiAuth = $fetch.create({
        baseURL: baseUrl,
        onRequest({request, options, error}) {
            let body = JSON.parse(options.body);
            body['application'] = 49;

            options.body = body;
        },
        onResponse(context, response) {
            if (response) {
                useCookie('user').value = JSON.stringify(response.data.token);
                return navigateTo("/");
            }
        },
        async onResponseError({response}) {
            if (response.status === 401 || response.status === 503) {
                await navigateTo('/login')
            }
        }
    })

    function jwtAppRequest(user) {
        return "/auth/app";
    }

    // Expose to useNuxtApp().$api
    return {
        provide: {
            apiAuth,
            jwtAppRequest
        }
    }
})