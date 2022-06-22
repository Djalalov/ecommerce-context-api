import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
	const products = [...Array(20)].map(() => ({
		id: faker.datatype.uuid(),
		name: faker.commerce.productName(),
		price: faker.commerce.price(100, 200, 0),
		image: faker.image.abstract(640, 480, true),
		inStock: faker.helpers.arrayElement([0, 3, 6, 4, 2]),
		fastDelivery: faker.datatype.boolean(),
		ratings: Math.floor(Math.random() * 5) + 1,
	}));
	const [state, dispatch] = useReducer(cartReducer, {
		products: products,
		cart: [],
	});

	const [productState, productDispatch] = useReducer(productReducer, {
		byStock: false,
		byFastDelivery: false,
		byRating: 0,
		bySearch: "",
	});
	return (
		<Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
			{children}
		</Cart.Provider>
	);
};

export default Context;
export const CartState = () => {
	return useContext(Cart);
};
