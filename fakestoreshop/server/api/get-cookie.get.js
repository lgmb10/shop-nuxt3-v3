export default defineEventHandler((event) => {
    try {
        return event.context.user_cookie;
    } catch (error) {
        return {status: 500}
    }
})