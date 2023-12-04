<template>
  <div class="h-[1000px] bg-slate-300">
    <ul>
      <li v-for="item of msgList" :key="item">
        <span>{{ item }}</span>
      </li>
    </ul>
    <!-- <input type="text" placeholder="请输入消息" v-model="msg" /> -->
    <div class="flex">
        <button class=" bg-lime-300 w-[100px] h-[50px]" @click="handleSendBtnClick">Send</button>
        <button class=" bg-lime-300 w-[100px] h-[50px] ml-2" @click="handleClearBtnClick">Clear</button>
    </div>
    
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useSignalR } from "@dreamonkey/vue-signalr";
// const signalr = useSignalR();

const msgList = reactive([]);

onMounted(() => {
    // signalr.invoke("UserGameLobbyInitial");
})

const handleSendBtnClick = () => {
    msgList.push('gg');
//   signalr.invoke("GetLobby");
};
const handleClearBtnClick = () => {
    msgList.length = 0;
}

// signalr.on('GetLobby', (data) => {
//   console.log(data);
//   msgList.push(data);
// });

// signalr.on("ReceiveMessage", (data) => {
// });
</script>

<style scoped></style>
