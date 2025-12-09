import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import App from "./App";
import { apolloClient } from "../shared/api/apollo-client";
import "../shared/styles/App.css";
import { Provider } from "react-redux";
import { store } from "../shared/store/store";
import { AuthInitializer } from "@/features/authRoutes/ui/AuthInitializer";
import { ToasterProvider } from "@/features/toaster/ToasterProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <AuthInitializer>
          <ToasterProvider>
            <App />
          </ToasterProvider>
        </AuthInitializer>
      </Provider>
    </ApolloProvider>
  </StrictMode>,
);
