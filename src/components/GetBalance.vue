<script setup>
import { ref, watch, watchEffect } from 'vue'

import Dashsight from 'dashsight'
import { DashSightWs } from 'dashsight/ws/browser-ws.js'
import * as CrowdNode from 'crowdnode'
//  OR
// import { create } from 'dashsight'
console.log('DashSightWs', DashSightWs)

let dashsightBaseUrl =
  import.meta.env.INSIGHT_BASE_URL || '/insight';

let dashsight = Dashsight.create({
  baseUrl: dashsightBaseUrl,
});

async function main() {
  // ex: inv,dashd/addresstxid
  // let eventnames = "inv".split(",");

  // TODO pass eventnames
  await DashSightWs.listen(
    'https://insight.dash.org',
    function finder(evname, data) {
      console.log(evname, data);
    },
    { debug: true },
  );
}

console.log("Trying...");
main().catch(function (err) {
  console.error("Fail:");
  console.error(err.stack || err);
});

console.log('dashsight', dashsight)

// Pulled from https://github.com/dashhive/dashsight.js/blob/main/examples/addrs.txt
let testAddresses = 'XmaroZwvCKjsYQQVdCQP2BuWnnMGxWLCGJ XmCyQ6qARLWXap74QubFMunngoiiA1QgCL XaxrcNUS6MrAfsvXNF2s24eChFVKabU6gP XdaWS6gScUjxbFdA8WSFZbeBK2mpGDr6uc XgfQUxiwo7BnTpwxAqpmVJSJwtJHdRCJd2 Xhn6eTCwW94vhVifhshyTeihvTa7LcatiM XnepcKMViJE3bR4ggFkAfLGgqBSr6EjA8z Xp3pqfnYUYLif4SqWFU3Fuv4hJJQRen1ud Xsa1WM9FbRxqSfBxjfFVjLfQ5zinK5NHio Xw2zuXP3VwoRKMoV7cA9TQpJ5bnbCsw13Q XxrK9XH5L3mGCyirz26RpGpCQcJB3v39Lk'
  .split(' ')

CrowdNode.init({
    baseUrl: '/crowdnode',
    insightBaseUrl: dashsightBaseUrl,
    knowledgeBaseUrl: '/knowledge'
});

async function getCrowdNodeBalances() {
  // for (let addr of testAddresses) {
    let cnBalance = await CrowdNode.http.GetBalance(
      address.value
    );
    crowdnodeBalance.value = cnBalance.value
    console.info(`Current CrowdNode balance for "${address.value}" is: Đ${cnBalance.value}`);
  // }
}

function getInstantBalance() {
  dashsight.getInstantBalance(address.value).then(function (info) {
    balance.value = info.balance
    console.info(`Current balance for "${address.value}" is: Đ${info.balance}`);
  });
}


function showCrowdNodeBalance() {
  return address.value !== '' && crowdnodeBalance.value !== '' && crowdnodeBalance.value !== 'Address not found.'
}
function showCrowdNodeError() {
  return address.value !== '' && crowdnodeBalance.value === 'Address not found.'
}
function showBalance() {
  return address.value !== '' && typeof balance.value !== 'string'
}
function disableButton() {
  return address.value === '' || address.value.length < 34
}

const address = ref('')
const balance = ref('')
const crowdnodeBalance = ref('')

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
    <input
      v-model="address"
      list="test-addresses"
      autocomplete="off"
      placeholder="Enter Đash Address"
    ><br><br>

    <datalist id="test-addresses">
      <option
        :value="addr"
        v-for="(addr, index) in testAddresses"
        :key="index"
      />
    </datalist>
    <button type="button" :disabled="disableButton()" @click="getInstantBalance">Get Balance</button>
    <button type="button" :disabled="disableButton()" @click="getCrowdNodeBalances">Get CrowdNode Balances</button>
  </div>
  <div class="card" v-if="showBalance()">
    <h3>Address: {{address}}</h3>
    <h3>Current balance: Đ{{balance}}</h3>
    <h3 v-if="showCrowdNodeBalance()">Current CrowdNode balance: Đ{{crowdnodeBalance}}</h3>
    <h3 v-if="showCrowdNodeError()">CrowdNode Error: {{crowdnodeBalance}}</h3>
  </div>
</template>

<style scoped>
</style>
