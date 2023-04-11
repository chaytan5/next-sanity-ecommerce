import Link from "next/link";
import { UrlFor } from "../lib/client";
import Image from "next/image";

const Product = ({ product: { slug, image, name, price } }) => {
	return (
		<div>
			<Link href={`/product/${slug.current}`}>
				<div className="product-card">
					<img
						src={UrlFor(image && image[0])}
						height={250}
						width={250}
						alt={name}
						className="product-image"
					/>
					<p className="product-name">{name}</p>
					<p className="product-price">₹ {price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
