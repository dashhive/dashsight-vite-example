<script setup>
import GetBalance from './components/GetBalance.vue'
import GetTransactions from './components/GetTransactions.vue'
import GetCrowdNodeBalance from './components/GetCrowdNodeBalance.vue'
import GetDashSocket from './components/GetDashSocket.vue'
import { ref } from 'vue'

const dash = ref(null)
</script>

<template>
  <GetBalance ref="dash" />
  <GetDashSocket />
  <GetCrowdNodeBalance :address="dash?.address" />
  <GetTransactions :address="dash?.address" />
</template>

<style scoped>
</style>
