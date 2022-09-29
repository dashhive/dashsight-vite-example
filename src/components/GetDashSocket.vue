<script setup>
import { ref, inject, } from 'vue'

import { DashSocket } from 'dashsight/ws'

const DASHSIGHT_BASE_URL = inject('DASHSIGHT_BASE_URL')

async function main() {
  await DashSocket.listen(
    DASHSIGHT_BASE_URL,
    function finder(evname, data) {
      console.log('dash socket', evname, data);
      insightStream.value = data
    },
    { debug: false },
  );
}

console.log("DashSocket Trying...");
main().catch(function (err) {
  console.error("DashSocket Fail:");
  console.error(err.stack || err);
});

function isBlock() {
  return typeof insightStream.value === 'string'
}

const insightStream = ref(null)
</script>

<template>
  <div class="card" v-if="insightStream !== null">
    <h3>DashSocket Stream</h3>
    <p v-if="isBlock()">🟩 block {{insightStream}}</p>
    <p v-else>
      Transaction {{insightStream.txlock ? '🔒' : '🔓'}}
      Đ{{insightStream.valueOut}}
      #{{insightStream.txid}}
    </p>
  </div>
</template>

<style scoped>
</style>
