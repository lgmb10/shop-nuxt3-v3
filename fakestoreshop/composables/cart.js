import {useState} from "nuxt/app";

export const useCart = () => useState('cartStore', () => [])
export const useCartQuantity = () => useState('cartStoreQuantity', () => 0)

export const cartActions = {
    ADD: "ADD",
    SETQUANTITY: "SETQUANTITY",
    REMOVE: "REMOVE"
}

export function modifyCart(product, action) {
    if (!process.client) return;
    const cartStore = useCart();
    const cartStoreQuantity = useCartQuantity();

    if (cartStore.value === null && action === cartActions.ADD) {
        cartStore.value = [product];
    } else {
        const index = cartStore.value.findIndex(o => o.id === product.id);
        if (index !== -1) {
            switch (action) {
                case cartActions.ADD :
                    cartStore.value[index].quantity += product.quantity;
                    break;
                case cartActions.SETQUANTITY:
                    cartStore.value[index].quantity = product.quantity;
                    break;
                case cartActions.REMOVE:
                    cartStore.value.splice(index, 1);
                    break;
            }
        } else {
            switch (action) {
                case cartActions.ADD :
                    cartStore.value.push(product);
                    break;
                case cartActions.SETQUANTITY:
                    cartStore.value.push(product);
                    break;
            }
        }
    }

    localStorage.setItem("cart", JSON.stringify(cartStore.value));
    countCartQuantity(cartStore, cartStoreQuantity);
}


export function countCartQuantity(cartStore, carStoreQuantity) {
    carStoreQuantity.value = 0;

    cartStore.value.forEach(product => {
        carStoreQuantity.value += product.quantity;
    })
}

export function calculatedFinalPrice(cartStore, listProduct) {
    let finalPrice = 0;
    cartStore.forEach(product => {
        finalPrice += listProduct[listProduct.findIndex(x => x.id === product.id)].price * product.quantity;
    });
    return finalPrice.toFixed(2);
}

export function dynamicSort(property) {
    let sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}