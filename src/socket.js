let client = null
const connectSocket = (topic) => {
  const baseUrl = import.meta.env.VITE_APP_WS_URL
  const wsUrl = `ws://${baseUrl}/${topic}/` 
  if (client) {
    return client
  } else {console.log(wsUrl);
    client = new WebSocket(wsUrl)
  }
  return client

}

export default connectSocket