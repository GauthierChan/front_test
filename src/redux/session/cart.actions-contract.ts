import {CartActionType} from "./cart.types";
import {CartItem} from "../../models/CartItem";

export interface AddItemsToCartAction {
    type: CartActionType.ADD_ITEMS_TO_CART;
    payload: {
        cartItem: CartItem;
        quantity: number;
    };
}

export interface SetCartItemQuantityAction {
    type: CartActionType.SET_CART_ITEM_QUANTITY;
    payload: {
        cartItem: CartItem;
        quantity: number;
    };
}

export interface DecreaseItemsFromCartAction {
    type: CartActionType.DECREASE_ITEMS_FROM_CART;
    payload: {
        itemUuid: string;
        quantity: number;
    };
}

export interface RemoveItemFromCartAction {
    type: CartActionType.REMOVE_ITEM_FROM_CART;
    payload: {
        itemUuid: string;
    };
}

export interface ResetCartAction {
    type: CartActionType.RESET_CART;
    payload: {
    };
}

export type CartActionContract =
    | AddItemsToCartAction
    | SetCartItemQuantityAction
    | DecreaseItemsFromCartAction
    | RemoveItemFromCartAction
    | ResetCartAction
    ;
