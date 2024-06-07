export function isJWTExpired(exp) {
    return (Date.now() >= exp * 1000)
}

export function checkUserRole(userRoles, role) {
    return userRoles.includes(role);
}

export function getInfoFromJWT(jwtToken) {
    let tokenParsed;

    try {
        tokenParsed = parseJwt(jwtToken);
    } catch (e) {
        return null;
    }

    return {
        username: tokenParsed.username,
        firstname: tokenParsed.firstname,
        roles: tokenParsed.roles,
        exp: tokenParsed.exp,
    }
}


export function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}