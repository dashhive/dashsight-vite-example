<script setup>
import { ref, watch, watchEffect } from 'vue'

import Dashsight from 'dashsight'
//  OR
// import { create } from 'dashsight'

let dashsightBaseUrl =
  import.meta.env.INSIGHT_BASE_URL || "https://insight.dash.org";

let dashsight = Dashsight.create({
  baseUrl: dashsightBaseUrl,
});

console.log('dashsight', dashsight)

function getInstantBalance() {
  dashsight.getInstantBalance(address.value).then(function (info) {
    balance.value = info.balance
    console.info(`Current balance for "${address.value}" is: Đ${info.balance}`);
  });
}


function showBalance() {
  return address.value !== '' && typeof balance.value !== 'string'
}
function disableButton() {
  return address.value === '' || address.value.length < 34
}

const address = ref('')
const balance = ref('')

watch(
  address,
  (address, prevAddress) => {
    if (address !== prevAddress) {
      balance.value = ''
    }
  }
)

watchEffect(
  () => address.value.length === 34 && getInstantBalance()
)
</script>

<template>
  <div class="card">
    <input v-model="address">
    <button type="button" :disabled="disableButton()" @click="getInstantBalance">Get Balance</button>
  </div>
  <div class="card" v-if="showBalance()">
    <h3>Address: {{address}}</h3>
    <h3>Current balance: Đ{{balance}}</h3>
  </div>
</template>

<style scoped>
input {
  background: #222;
  color: #888;
}
</style>
