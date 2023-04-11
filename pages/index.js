import Head from "next/head";
import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
	return (
		<>
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />

			<div className="products-heading">
				<h2>Best Selling products</h2>
				<p>Speakers of high quality.</p>
			</div>
			<div className="products-container">
				{products?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]} />
		</>
	);
}

export const getServerSideProps = async () => {
	const productQuery = '*[_type == "product"]';
	const products = await client.fetch(productQuery);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: {
			products,
			bannerData,
		},
	};
};
