import React from "react";
import "public/global.css";
import { CustomHead } from "components";
import { NotificationsProvider } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import Script from "next/script";

const MyApp = (props) => {
	const { Component, pageProps } = props;
	const [darkMode, setDarkMode] = React.useState(false);

	React.useEffect(() => {
		if (
			window?.matchMedia &&
			window?.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			setDarkMode(true);
		}
	}, []);

	React.useEffect(() => {
		const sw = () => {
			const urlBase64ToUint8Array = (urlBase64) => {
				const padding = "=".repeat((4 - (urlBase64.length % 4)) % 4);
				const base64 = (urlBase64 + padding)
					.replace(/\-/g, "+")
					.replace(/_/g, "/");
				const rawData = window.atob(base64);
				const outputArray = new Uint8Array(rawData.length);
				for (let i = 0; i < rawData.length; ++i) {
					outputArray[i] = rawData.charCodeAt(i);
				}
				return outputArray;
			};
			const determineAppServerKey = () => {
				let vapidPublicKey =
					"BNPY-oENKui_C6lZlIcNhWC2mqV9G0xuiuBL5H1-FHy-mysyiROV7mjdzj1meBLNfbjVsLx2Ome12p11HG6LJAs";
				return urlBase64ToUint8Array(vapidPublicKey);
			};
			let swUrl = `/sw.js`;
			navigator.serviceWorker.register(swUrl).then((res) => {
				console.warn("res", res);
				return res.pushManager
					.getSubscription()
					.then((subscription) => {
						return res.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey: determineAppServerKey(),
						});
					});
			});
		};
		sw();
		document.addEventListener("fetch", (event) => {
			event.waitUntil(
				this.registration.showNotification("Hello", {
					body: "Hello World",
				})
			);
		});
	}, []);

	return (
		<>
			{/* <Script id="test" src="/test.js" /> */}
			<CustomHead />
			<MantineProvider
				theme={{ colorScheme: darkMode ? "dark" : "light" }}
				withGlobalStyles
				withNormalizeCSS
			>
				<NotificationsProvider>
					<Component {...pageProps} />
				</NotificationsProvider>
			</MantineProvider>
		</>
	);
};
export default MyApp;
