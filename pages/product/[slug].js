import { UrlFor, client } from "../../lib/client";
import {
	AiOutlineStar,
	AiFillStar,
	AiOutlinePlus,
	AiOutlineMinus,
} from "react-icons/ai";
import Product from "../../components/Product";
import { useState } from "react";
import { useStateContext } from "../../context/StateContext";

const ProductDetails = ({ product, allProducts }) => {
	const { image, name, price, details } = product;
	const [index, setIndex] = useState(0);
	const { qty, decreaseQty, increaseQty, onAdd } = useStateContext();

	return (
		<div>
			<div className="product-detail-container">
				<div>
					<div className="image-container">
						<img
							src={UrlFor(image && image[index])}
							alt="product image"
							className="product-detail-image"
						/>
					</div>
					<div className="small-images-container">
						{image?.map((item, i) => (
							<img
								src={UrlFor(item)}
								key={i}
								alt={item.name}
								className={
									i === index ? "small-image selected-image" : "small-image"
								}
								onMouseOver={() => setIndex(i)}
							/>
						))}
					</div>
				</div>

				<div className="product-detail-desc">
					<h1>{name}</h1>
					<div className="reviews">
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{details}</p>
					<p className="price">₹ {price}</p>
					<div className="quantity">
						<h3>Quantity:</h3>
						<p className="quantity-desc">
							<span className="minus" onClick={() => decreaseQty()}>
								<AiOutlineMinus />
							</span>
							<span className="num">{qty}</span>
							<span className="plus" onClick={() => increaseQty()}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className="buttons">
						<button
							type="button"
							className="add-to-cart"
							onClick={() => onAdd(product, qty)}
						>
							Add to Cart
						</button>
						<button type="button" className="buy-now">
							Buy Now
						</button>
					</div>
				</div>
			</div>
			<div className="maylike-products-wrapper">
				<h2>You may also like</h2>
				<div className="marquee">
					<div className="maylike-products-container track">
						{allProducts?.map((product) => (
							<Product key={product._id} product={product} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"]{
    slug{
      current
    }
  }`;

	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const productQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const allProductsQuery = '*[_type == "product"]';

	const product = await client.fetch(productQuery);
	const allProducts = await client.fetch(allProductsQuery);

	return {
		props: {
			product,
			allProducts,
		},
	};
};

export default ProductDetails;
