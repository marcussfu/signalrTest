import { VueSignalR } from '@dreamonkey/vue-signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';

import JsonViewer from "vue3-json-viewer";
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import "vue3-json-viewer/dist/index.css";

import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import connectSocket from './socket'
import router from './router/index'

const connection = new HubConnectionBuilder()
  .withUrl('https://localhost:7193/clientHub')
  .build();

const app = createApp(App)
app.use(router)
// app.use(VueSignalR, { connection })
// app.provide('socket', connectSocket)
app.use(JsonViewer);
app.mount('#app')



