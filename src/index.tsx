import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from "react-redux";
import { store } from "./store/store";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { QueryClientProvider, QueryClient } from "react-query";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

function Index() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<React.StrictMode>
					<CookiesProvider>
						<SnackbarProvider
							maxSnack={3}
							anchorOrigin={{ horizontal: "left", vertical: "top" }}
							disableWindowBlurListener
							preventDuplicate
						>
							<App status="online" />
						</SnackbarProvider>
					</CookiesProvider>
				</React.StrictMode>
			</QueryClientProvider>
		</Provider>
	);
}

root.render(<Index />);

serviceWorkerRegistration.register();
