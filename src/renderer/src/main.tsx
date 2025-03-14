
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoot from "./app/index"
import '@mantine/core/styles.css';
// import 'mantine-datatable/styles.layer.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/charts/styles.css';
import "./App.css"
import App from './modules/print';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRoot/>
  </React.StrictMode>
)