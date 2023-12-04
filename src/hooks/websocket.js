
const useWebSocket = (handleMessage) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const port = import.meta.env.VITE_WS_PORT;
  // const wsUrl = `ws://datapush.98kbus.top/websocket/server?appid=app2881111a0de78c8d9d&secret=sec33ce872a385e585f8`;
  const wsUrl = `wss://datafeed.vivogaming.studio/v2/baccarat TableID 348`;
//`ws://${baseUrl}:${port}/`;
  const ws = new WebSocket(wsUrl);

  const init = () => {
    bindEvent();
  };

  const bindEvent = () => {
    ws.addEventListener("open", handleOpen, false);
    ws.addEventListener("close", handleClose, false);
    ws.addEventListener("error", handleError, false);
    ws.addEventListener("message", handleMessage, false);
  };

  const handleOpen = (e) => {
    console.log("websocket open", e);
  };
  const handleClose = (e) => {
    console.log("websocket close", e);
  };
  const handleError = (e) => {
    console.log("websocket error", e);
  };

  init();

  return ws;
};

export default useWebSocket;
