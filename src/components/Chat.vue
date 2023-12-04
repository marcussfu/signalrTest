<script setup>
import { ref, inject } from "vue";
const props = defineProps({
  receiveData: String,
})
const socket = inject("socket");
let message = ref("");

console.log("RRRRRR", props.receiveData);

const sendMessage = () => {
  const ws = socket("websocket/message");
  console.log("send out", message.value);
  ws.send(message.value);
};
</script>

<template>
  <div class="p-2">
    <div class="textAreaContent">
      <textarea id="txtShow"  disabled ></textarea>
    </div>
    <div class="inputContent mt-2">
      <input id="txtInput" v-model="message" placeholder="edit me"/>
      <button id="btnSend" type="button" @click="sendMessage">SEND</button>
    </div>
    <div>{{receiveData}}</div>
  </div>
  
</template>

<style lang="scss" scoped>
  .textAreaContent {
    width: 500px;
    height: 300px;
    border: 1px black solid;
  }
  .inputContent {
    width: 500px;
  }
  #txtShow {
    width: 100%;
    height: 300px;
  }
  #txtInput {
    width: 90%;
  }
  #btnSend {
    width: 10%;
  }
</style>