import React, { useState, createContext, useEffect, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState();
	const [totalQuantities, setTotalQuantities] = useState();
	const [qty, setQty] = useState(1);

	const onAdd = (product, qty) => {
		const doesProductExistInCart = cartItems.find(
			(item) => product._id === item._id
		);
		setTotalPrice((prevPrice) => prevPrice + product.price * qty);
		setTotalQuantities((prevQuantities) => prevQuantities + qty);

		if (doesProductExistInCart) {
			const updatedCart = cartItems.map((item) => {
				if (item._id === product._id) {
					return {
						...item,
						quantity: item.quantity + qty,
					};
				}
			});

			setCartItems(updatedCart);
		} else {
			product.quantity = qty;
			setCartItems([
				...cartItems,
				{
					...product,
				},
			]);
		}

		toast.success(`${qty} ${product.name} added to cart!`);
	};

	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};

	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;

			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				increaseQty,
				decreaseQty,
				onAdd,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
