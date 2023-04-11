import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
	projectId: "y7kcm8z9",
	dataset: "production",
	apiVersion: "2023-04-09",
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const UrlFor = (source) => builder.image(source);
