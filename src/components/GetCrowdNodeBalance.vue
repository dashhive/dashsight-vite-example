<script setup>
import { ref, watch, inject, } from 'vue'
import * as CrowdNode from 'crowdnode'

const DASHSIGHT_BASE_URL = inject('DASHSIGHT_BASE_URL')

CrowdNode.init({
    baseUrl: '/crowdnode',
    insightBaseUrl: DASHSIGHT_BASE_URL,
    knowledgeBaseUrl: '/knowledge'
});

async function getCrowdNodeBalances() {
  let cnBalance = await CrowdNode.http.GetBalance(
    address.value
  );

  crowdnodeBalance.value = cnBalance

  console.info(
    `Current CrowdNode balance for "${
      address.value
    }" is Đ${
      cnBalance.TotalBalance
    } with ${
      cnBalance.TotalDividend
    } in dividends.`,
    cnBalance
  );
}

function showCrowdNodeBalance() {
  return (
    address.value !== '' &&
    'TotalBalance' in crowdnodeBalance.value &&
    crowdnodeBalance.value?.value !== 'Address not found.'
  )
}
function showCrowdNodeError() {
  return (
    address.value !== '' &&
    crowdnodeBalance.value?.value === 'Address not found.'
  )
}

const address = ref('')
const crowdnodeBalance = ref({})

const props = defineProps({
  address: String
})

watch(
  () => props.address,
  (addr, prevAddr) => {
    if (addr !== prevAddr) {
      crowdnodeBalance.value = {}
      address.value = props.address
      if (address.value !== '') {
        getCrowdNodeBalances()
      }
    }
  }
)
</script>

<template>
  <div class="card" v-if="showCrowdNodeBalance() || showCrowdNodeError()">
    <h3 v-if="showCrowdNodeBalance()">
      Current CrowdNode balance
      Đ{{crowdnodeBalance.TotalBalance}} with
      Đ{{crowdnodeBalance.TotalDividend}} in dividends.
    </h3>
    <h3 v-if="showCrowdNodeError()">
      CrowdNode Error: {{crowdnodeBalance.value}}
    </h3>
  </div>
</template>

<style scoped>
</style>
