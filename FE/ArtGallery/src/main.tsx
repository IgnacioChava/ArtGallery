import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'
import LoginPage from './pages/LoginPage/LoginPage.tsx';
const app = (
	<React.StrictMode>
		<App></App>
	</React.StrictMode>
);

const rootElement = document.getElementById('root');
if (rootElement != null) {
	ReactDOM.createRoot(rootElement).render(app);
}