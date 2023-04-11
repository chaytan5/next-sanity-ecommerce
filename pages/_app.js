import { Layout } from "../components";
import "../styles/Globals.css";

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
