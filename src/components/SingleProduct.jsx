import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ product }) => {
	const {
		state: { cart },
		dispatch,
	} = CartState();
	return (
		<div className="products">
			<Card className="single__card">
				<Card.Img variant="top" src={product.image} alt="product.name" />
				<Card.Body className="card__details">
					<Card.Title>{product.name}</Card.Title>
					<Card.Subtitle className="foo">
						<span className="card__price">$ {product.price}</span>
						{product.fastDelivery ? (
							<Badge
								as="div"
								style={{
									display: "inherit",
									width: "30%",
									margin: "10px 0",
									padding: "7px 0",
								}}
								pill
								bg="success"
								className="card__delivery"
							>
								Fast Delivery
							</Badge>
						) : (
							<Badge
								pill
								bg="danger"
								style={{
									display: "inherit",
									width: "32%",
									margin: "10px 0",
									padding: "7px 0",
								}}
								className="card__delivery"
							>
								4 days delivery
							</Badge>
						)}
						<Rating className="card__rating" rating={product.ratings} />
					</Card.Subtitle>
					{cart.some(p => p.id === product.id) ? (
						<Button
							variant="danger"
							onClick={() => {
								dispatch({
									type: "REMOVE_FROM_CARD",
									payload: product,
								});
							}}
						>
							Remove from cart
						</Button>
					) : (
						<Button
							variant="success"
							disabled={!product.inStock}
							onClick={() => {
								dispatch({
									type: "ADD_TO_CARD",
									payload: product,
								});
							}}
						>
							{!product.inStock ? "Out of stock" : "Add to cart"}
						</Button>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default SingleProduct;
