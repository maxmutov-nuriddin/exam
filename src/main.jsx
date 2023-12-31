import ReactDOM from 'react-dom/client'
import AuthContextProvider from './context/AuthContext.jsx'

import App from './App.jsx'


import "antd/dist/reset.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
)
