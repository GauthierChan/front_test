import * as CartActionContract from './cart.actions-contract';
import {CartItem} from "../../models/CartItem";
import {CartActionType} from "./cart.types";

export const addItemsToCart = (cartItem: CartItem, quantity: number): CartActionContract.AddItemsToCartAction => {
    return {
        type: CartActionType.ADD_ITEMS_TO_CART,
        payload: {
            cartItem, quantity
        },
    };
};

export const setCartItemQuantity = (cartItem: CartItem, quantity: number): CartActionContract.SetCartItemQuantityAction => {
    return {
        type: CartActionType.SET_CART_ITEM_QUANTITY,
        payload: {
            cartItem, quantity
        },
    };
};

export const decreaseItemsFromCart = (itemUuid: string, quantity: number): CartActionContract.DecreaseItemsFromCartAction => {
    return {
        type: CartActionType.DECREASE_ITEMS_FROM_CART,
        payload: {
            itemUuid, quantity
        },
    };
};

export const removeItemFromCart = (itemUuid: string): CartActionContract.RemoveItemFromCartAction => {
    return {
        type: CartActionType.REMOVE_ITEM_FROM_CART,
        payload: {
            itemUuid
        },
    };
};

export const resetCart = (): CartActionContract.ResetCartAction => {
    return {
        type: CartActionType.RESET_CART,
        payload: {
        },
    };
};
