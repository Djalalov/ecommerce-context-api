import { useEffect, useState } from "react";
import {
	Button,
	Col,
	Form,
	Image,
	ListGroup,
	ListGroupItem,
	Row,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
	const {
		state: { cart },
		dispatch,
	} = CartState();

	const [total, setTotal] = useState();

	useEffect(() => {
		setTotal(
			cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
		);
	}, [cart]);
	/* (acc, curr) => acc + Number(curr.price) * curr.qty, 0; */
	return (
		<div>
			<div className="prodContainer">
				<ListGroup className="basket__items__container">
					{cart.map(prod => (
						<ListGroupItem key={prod.id} className="card__row">
							<Row>
								<Col md={2}>
									<Image
										className="card__img"
										src={prod.image}
										alt={prod.name}
										fluid
										rounded
									/>
								</Col>

								<Col md={2}>
									<span>{prod.name}</span>
								</Col>
								<Col md={2}>
									<span>$ {prod.price}</span>
								</Col>
								<Col md={2}>
									<Rating rating={prod.rating} />
									{console.log(prod.inStock)}
								</Col>
								<Col md={2}>
									<Form.Control
										as="select"
										value={prod.qty}
										onChange={e =>
											dispatch({
												type: "CHANGE_CARD_QTY",
												payload: {
													id: prod.id,
													qty: e.target.value,
												},
											})
										}
									>
										{[...Array(prod.inStock).keys()].map(x => (
											<option key={x + 1}>{x + 1}</option>
										))}
									</Form.Control>
								</Col>

								<Col md={2}>
									<Button
										type="button"
										variant="danger"
										bg="danger"
										onClick={() =>
											dispatch({
												type: "REMOVE_FROM_CARD",
												payload: prod,
											})
										}
									>
										<AiFillDelete fontSize="18px" />
									</Button>
								</Col>
							</Row>
						</ListGroupItem>
					))}
				</ListGroup>
			</div>
			<div className="filters">
				<span className="title">Subtotal ({cart.length}) item</span>
				<span style={{ fontWeight: 700, fontSize: 20 }}>Total: $ {total}</span>
				<Button type="button" disabled={cart.length === 0}>
					Proceed to checkout
				</Button>
			</div>
		</div>
	);
};

export default Cart;
