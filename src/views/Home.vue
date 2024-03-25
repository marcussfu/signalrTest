<template>
  <div>
    <div class="flex items-center mb-4">
      <div class="pr-2">Select Data Source:</div>
      <select v-model="currentDataSource" class="w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
      focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" @change="changeDataSource">
        <option v-for="item in dataSourceList" :key="item.text" :value="item">
          {{ item.text }}
        </option>
      </select>
    </div>

    <div class="flex items-center mb-2">
      <div class="pr-2">TableId:</div>
      <input
        v-model="tableId"
        class="w-[80px] h-[30px] border-solid border-2 border-black mr-2"
      />
      <button class="bg-[blue] text-[white] flex items-center p-1" @click="pauseClick">
        {{ isPause? 'Start' : 'Pause' }}
      </button>
    </div>
    
    <ul>
      <li class="flex flex-col" v-for="item of tablesData.slice().reverse()" :key="item.id+item">
        <span class="my-2 bg-[green]/40">{{ item }}</span>
        <!-- <JsonViewer :value="item" copyable sort theme="dark"  @onKeyClick="keyClick"/> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
// import {JsonViewer} from "vue3-json-viewer"
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import "vue3-json-viewer/dist/index.css";
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue'

const isPause = ref(false);
const tableId = ref('');
const msgList = reactive([]);
const currentTableIdDataList = reactive([]);
const ws = ref(null);
const alertMessage = ref('');

const dataSourceList = reactive([
  {text: '百家樂', name: 'baccarat', dataSourceUrl: 'wss://datafeed.vivogaming.studio/v2/baccarat'},
  {text: '龍虎1', name: 'dragontiger1', dataSourceUrl: 'wss://mxg.kasoom.com:9005'},
  {text: '龍虎2', name: 'dragontiger2', dataSourceUrl: 'wss://mxgws.kasoom.com:9005'},
  {text: '輪盤', name: 'roulette', dataSourceUrl: 'wss://datafeed.vivogaming.studio/v2/roulette'},
  {text: '骰寶', name: 'sicbo', dataSourceUrl: 'wss://mxgws.kasoom.com:9007'},
  {text: '21點', name: 'blackjack', dataSourceUrl: 'wss://mxgwss.kasoom.com:9007/bj3/dfghiksdcfgs'},
  {text: '德州撲克', name: 'Texasholdem', dataSourceUrl: 'wss://mxgwss.kasoom.com:9007/holdem/dfghiksdcfgs'}
]);
const currentDataSource = ref(dataSourceList[0]);

onMounted(() => {
  connectWS();
})

onUnmounted(() => {
  ws.value.close();
})

const connectWS = () => {
  try {
    if (ws.value !== null)
      ws.value.close();

    ws.value = new WebSocket(currentDataSource.value.dataSourceUrl);
    ws.value.onopen = () => {
      currentTableIdDataList.length = 0;
      // Web Socket is connected, send data using send()
      ws.value.send("Message to send");
      // alert("Message is sent...");
      alertMessage.value = "Connection is closed...";
    };

    ws.value.onmessage = (evt) => { 
      if (!isPause.value) {
        msgList.length = 0;
        var received_msg = evt.data;
        msgList.push(received_msg);
      }
    };

    ws.value.onclose = () => { 
      // websocket is closed.
      alert(alertMessage.value); 
    };
  }
  catch (error) {
    alert("connect error");
  }
  
}

const changeDataSource = (event) => {
  alertMessage.value = "Connection Change";
  connectWS();
  msgList.length = 0;
};

watch(
  () => tableId.value,
  (newId, oldId) => {
    if (newId !== oldId)
      currentTableIdDataList.length = 0;
  }
);

const tablesData = computed(() => {
  switch (currentDataSource.value.name) {
    case 'baccarat':
    case 'roulette':
      if (tableId.value !== '') {
        const jsonMsgData = JSON.parse(msgList);
        currentTableIdDataList.push({timeStamp: jsonMsgData.timeStamp, tableData: jsonMsgData[currentDataSource.value.name].tables.filter((tData) => tData.TableID === tableId.value)});
        return currentTableIdDataList;
      }
      break;
    case 'dragontiger1':
      break;
    case 'dragontiger2':
      break;
    case 'sicbo':
      break;
    case 'blackjack':
      break;
    case 'Texasholdem':
      break;
  }
  return msgList;
});

const pauseClick = () => {
  isPause.value = !isPause.value;
}
</script>

<style scoped>
</style>