import {CartActionType} from './cart.types';
import {CartActionContract} from './cart.actions-contract';
import {CartItem} from "../../models/CartItem";

export interface CartState {
    cart: CartItem[];
}

export const cartReducerInitialState: CartState = {
    cart: [],
};

const cartReducer = (state: CartState = cartReducerInitialState, action: CartActionContract) => {
    switch (action.type) {
        case CartActionType.ADD_ITEMS_TO_CART: {
            const {cartItem, quantity} = action.payload

            let cartItems = state.cart;
            if(cartItems.some((item) => item.item.id === cartItem.item.id)){
                // User already has some of this item
                cartItems.find((item) => item.item.id === cartItem.item.id)!!.quantity += quantity
            }else {
                // Add new item
                cartItem.quantity = quantity
                cartItems = [...cartItems, cartItem]
            }
            return {
                ...state,
                cart: cartItems
            }
        }
        case CartActionType.SET_CART_ITEM_QUANTITY: {
            const {cartItem, quantity} = action.payload

            let cartItems = state.cart;
            if(cartItems.some((item) => item.item.id === cartItem.item.id)){
                cartItems.find((item) => item.item.id === cartItem.item.id)!!.quantity = quantity
            }else {
                // Couldn't find the item. Add it
                cartItem.quantity = quantity
                cartItems = [...cartItems, cartItem]
            }
            return {
                ...state,
                cart: cartItems
            }
        }
        case CartActionType.DECREASE_ITEMS_FROM_CART: {
            const {itemUuid, quantity} = action.payload

            let cartItems = state.cart;
            let cartItemQuantity = cartItems.find((cartItem) => cartItem.item.id === itemUuid)?.quantity
            if(cartItemQuantity){
                // User already has some of this item.quantity
                if(cartItemQuantity > 1){
                    cartItems.find((cartItem) => cartItem.item.id === itemUuid)!!.quantity -= quantity
                }else {
                    // Remove item
                    cartItems = cartItems.filter((cartItem) => cartItem.item.id !== itemUuid)
                }
            }else {
                // Couldn't find the item.
            }
            return {
                ...state,
                cart: cartItems
            }
        }
        case CartActionType.REMOVE_ITEM_FROM_CART: {
            const {itemUuid} = action.payload
            let cartItems = state.cart;
            if(cartItems.some((cartItem) => cartItem.item.id === itemUuid)){
                return {
                    ...state,
                    cart: cartItems.filter((cartItem) => cartItem.item.id !== itemUuid)
                }
            }else {
                // Couldn't find the item.
                return state
            }
        }
        case CartActionType.RESET_CART: {
            return cartReducerInitialState
        }
        default:
            return state;
    }
};


export default cartReducer;
