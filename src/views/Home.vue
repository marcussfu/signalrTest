<template>
  <div>
    <div class="flex items-center pb-4">
      <div class="pr-2">TableId:</div>
      <input
        v-model="tableId"
        class="w-[80px] h-[30px] border-solid border-2 border-black"
      />
      <!-- <button
        class="mx-[20px] h-[30px] rounded-full bg-blue-600 px-[10px]"
        @click="SearchTableDataFromTableId"
      >
        Search
      </button> -->
    </div>
    
    <ul>
      <li class="flex flex-col" v-for="item of tablesData" :key="item.id+item">
        <span class="my-2 bg-[green]/40">{{ item }}</span>
        <!-- <JsonViewer :value="item" copyable sort theme="dark"  @onKeyClick="keyClick"/> -->
      </li>
    </ul>
  </div>
</template>

<script setup>
import {JsonViewer} from "vue3-json-viewer"
// if you used v1.0.5 or latster ,you should add import "vue3-json-viewer/dist/index.css"
import "vue3-json-viewer/dist/index.css";
import { ref, reactive, computed, watch } from 'vue'

const tableId = ref('');
const msgList = reactive([]);
const currentTableIdDataList = reactive([]);

var ws = new WebSocket(`wss://datafeed.vivogaming.studio/v2/baccarat TableID 348`);
//(`ws://datapush.98kbus.top/websocket/server?appid=app2881111a0de78c8d9d&secret=sec33ce872a385e585f8`);
    
ws.onopen = function() {
  currentTableIdDataList.length = 0;
  // Web Socket is connected, send data using send()
  ws.send("Message to send");
  // alert("Message is sent...");
};

ws.onmessage = function (evt) { 
  msgList.length = 0;
  var received_msg = evt.data;
  msgList.push(received_msg);
};

ws.onclose = function() { 
  // websocket is closed.
  alert("Connection is closed..."); 
};

watch(
  () => tableId.value,
  (newId, oldId) => {
    if (newId !== oldId)
      currentTableIdDataList.length = 0;
  }
);

const tablesData = computed(() => {
  if (tableId.value !== '') {
    // return JSON.parse(msgList).baccarat.tables.filter((tData) => tData.TableID === tableId.value);
    currentTableIdDataList.push(JSON.parse(msgList).baccarat.tables.filter((tData) => tData.TableID === tableId.value));
    return currentTableIdDataList;
  }
  return msgList;
});
</script>