import Head from "next/head";

const CustomHead = () => {
	return (
		<Head>
			<title>Go Gym</title>
			<meta
				name="viewport"
				content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=yes, viewport-fit=cover"
			/>

			<meta name="application-name" content="Go Gym" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<meta
				name="apple-mobile-web-app-status-bar-style"
				content="default"
			/>
			<meta name="apple-mobile-web-app-title" content="Go Gym" />
			<meta
				name="description"
				content="Go Gym is a web app that helps you gather with friends to go to the gym"
			/>
			<meta name="format-detection" content="telephone=no" />
			<meta name="mobile-web-app-capable" content="yes" />
			<meta
				name="msapplication-config"
				content="/icons/browserconfig.xml"
			/>
			<meta name="msapplication-TileColor" content="#ff0000" />
			<meta name="msapplication-tap-highlight" content="no" />
			<meta name="theme-color" content="#000000" />

			<link rel="apple-touch-icon" href="/icons/icon-512x512.png" />
			<link
				rel="apple-touch-icon"
				sizes="152x152"
				href="/icons/icon-512x512.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/icons/touch-icon-iphone-retina.png"
			/>
			<link
				rel="apple-touch-icon"
				sizes="167x167"
				href="/icons/touch-icon-ipad-retina.png"
			/>

			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/icons/icon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/icons/icon-16x16.png"
			/>
			<link rel="manifest" href="/manifest.json" />
			<link
				rel="mask-icon"
				href="/icons/icon-512x512.png"
				color="#ff0000"
			/>
			<link rel="shortcut icon" href="/favicon.ico" />

			<meta name="twitter:card" content="summary" />
			<meta name="twitter:url" content="https://yourdomain.com" />
			<meta name="twitter:title" content="Go Gym" />
			<meta
				name="twitter:description"
				content="Go Gym is a web app that helps you gather with friends to go to the gym"
			/>
			<meta name="twitter:image" content="/icons/icon-192x192.png" />
			<meta name="twitter:creator" content="@FAIMAN" />
			<meta property="og:type" content="website" />
			<meta property="og:title" content="Go Gym" />
			<meta
				property="og:description"
				content="Go Gym is a web app that helps you gather with friends to go to the gym"
			/>
			<meta property="og:site_name" content="Go Gym" />
			<meta property="og:url" content="https://yourdomain.com" />
			<meta property="og:image" content="/icons/icon-512x512.png" />
		</Head>
	);
};

export default CustomHead;
