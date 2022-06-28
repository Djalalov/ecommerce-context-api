import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import {
	Badge,
	Container,
	Dropdown,
	FormControl,
	Navbar,
	Nav,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";

const Header = () => {
	const {
		state: { cart },
		dispatch,
		productDispatch,
	} = CartState();

	return (
		<Navbar sticky="top" bg="dark" variant="dark" style={{ height: "8vh" }}>
			<Container fluid style={{ padding: "0 20px" }}>
				<Navbar.Brand>
					<Link to="/">Elegant Store</Link>
				</Navbar.Brand>
				<Navbar.Text className="search">
					<FormControl
						style={{ width: 500 }}
						placeholder="Search foods"
						className="m-auto"
						onChange={e => {
							productDispatch({
								type: "FILTER_BY_SEARCH",
								payload: e.target.value,
							});
						}}
					/>
				</Navbar.Text>
				<Nav>
					<Dropdown align="end">
						<Dropdown.Toggle variant="success">
							<FaShoppingCart color="white" fontSize="25px" />
							<Badge bg="Success">{cart.length}</Badge>
						</Dropdown.Toggle>
						<Dropdown.Menu style={{ minWidth: 370 }}>
							{cart.length > 0 ? (
								<>
									{cart.map(prod => (
										<span className="basket__item" key={prod.id}>
											<img
												className="basket__img"
												src={prod.image}
												alt={prod.name}
											/>
											<div className="basket__item-details">
												<span>{prod.name}</span>
												<span>$ {prod.price}</span>
											</div>
											<AiFillDelete
												fontSize="20px"
												style={{ cursor: "pointer" }}
												onClick={() =>
													dispatch({
														type: "REMOVE_FROM_CARD",
														payload: prod,
													})
												}
											/>
											<br />
										</span>
									))}
									<Link to="/cart">
										<Button style={{ width: "95%", margin: "0 10px" }}>
											Go to Cart
										</Button>
									</Link>
								</>
							) : (
								<span style={{ padding: 10 }}>Cart is empty</span>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
