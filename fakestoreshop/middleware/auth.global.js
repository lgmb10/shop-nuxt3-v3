import {navigateTo, useCookie} from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {

    const token = await $fetch('/api/get-cookie');

    let user = null;

    if (process.client) {
        if (to.fullPath.includes('adminPanel')) {

            if (token && token !== "noToken") {
                user = getInfoFromJWT(token)

                if (!user || isJWTExpired(user.exp) || !checkUserRole(user.roles, "ROLE_SUPER_ADMIN")) {
                    useCookie("user").value = null;
                    return navigateTo("/login")
                }

            } else {
                return navigateTo("/login")
            }

        }
    }

});