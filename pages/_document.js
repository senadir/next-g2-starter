import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { cache } from '@wp-g2/styles';

const { extractCritical } = createEmotionServer(cache);

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		const styles = extractCritical(initialProps.html);

		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<style
						data-emotion-css={styles.ids.join(' ')}
						dangerouslySetInnerHTML={{ __html: styles.css }}
					/>
				</>
			),
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
