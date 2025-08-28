import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/App.css'
import App from './App'
// import { store } from "@/app/store";
// import { Provider } from "react-redux";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <App />
    {/* <Provider store={store}>
    </Provider> */}
  </StrictMode>,
)
