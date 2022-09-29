<script setup>
import {
  ref,
  watch,
  watchEffect,
  inject,
  defineExpose,
} from 'vue'

import Dashsight from 'dashsight'

const DASHSIGHT_BASE_URL = inject('DASHSIGHT_BASE_URL')
const DASH_ADDR_LENGTH = inject('DASH_ADDR_LENGTH')
const testAddresses = inject('testAddresses')
const address = ref('')
const balance = ref('')

let dashsight = Dashsight.create({
  baseUrl: DASHSIGHT_BASE_URL,
});

function getInstantBalance() {
  dashsight.getInstantBalance(address.value).then(function (info) {
    balance.value = info.balance
    console.info(
      `Current balance for "${address.value}" is: Đ${info.balance}`
    );
  });
}

function showBalance() {
  return address.value !== '' && typeof balance.value !== 'string'
}
function disableButton() {
  return address.value === '' || address.value.length < DASH_ADDR_LENGTH
}

defineExpose({ address })

watch(
  address,
  (address, prevAddress) => {
    if (address !== prevAddress) {
      balance.value = ''
    }
  }
)

watchEffect(
  () => address.value.length === DASH_ADDR_LENGTH && getInstantBalance()
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

    <button
      type="button"
      :disabled="disableButton()"
      @click="getInstantBalance"
    >Get Balance</button>
  </div>
  <div class="card" v-if="showBalance()">
    <h3>Address: {{address}}</h3>
    <h3>Current balance: Đ{{balance}}</h3>
  </div>
</template>

<style scoped>
</style>
