export default defineEventHandler((event) => {
    const userCookie = getCookie(event, 'user');
    if(userCookie){
        event.context.user_cookie = userCookie
    }else {
        event.context.user_cookie = "noToken"
    }
});