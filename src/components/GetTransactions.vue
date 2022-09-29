<script setup>
import { ref, watch, inject, } from 'vue'
import Dashsight from 'dashsight'

const DASHSIGHT_BASE_URL = inject('DASHSIGHT_BASE_URL')

let dashsight = Dashsight.create({
  baseUrl: DASHSIGHT_BASE_URL,
});

function getTransactions() {
  dashsight.getTxs(address.value).then(function ({ txs }) {
    transactions.value = txs.map(({
      txid, valueOut, time
    }) => ({
      txid, valueOut, time
    }))
    console.log('dashsight getTxs', transactions.value)
  });
}

function showTransactions() {
  return address.value !== '' && transactions.value.length > 0
}

const address = ref('')
const transactions = ref([])

const props = defineProps({
  address: String
})

watch(
  () => props.address,
  (addr, prevAddr) => {
    if (addr !== prevAddr) {
      transactions.value = []
      address.value = props.address
      if (address.value !== '') {
        getTransactions()
      }
    }
  }
)
</script>

<template>
  <div class="card" v-if="showTransactions()">
    <h3>Transactions</h3>
    <ul>
      <li
        v-for="({ txid, valueOut, time }, index) in transactions"
        :key="index"
      >
        <h2><strong>Đ{{valueOut}}</strong></h2>
        <em>on {{(new Date(time*1000)).toISOString()}}</em>
        <p>from #{{txid}}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
