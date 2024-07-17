import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import { RootProvider } from './app/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RootProvider />
	</React.StrictMode>
)
