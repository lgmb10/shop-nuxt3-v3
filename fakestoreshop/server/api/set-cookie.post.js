export default defineEventHandler((event) => {
    try {
        setCookie(event, 'user', null, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        return 200
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: 'Something went wrong.',
        })
    }
});