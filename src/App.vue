<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

// import Dashsight from 'dashsight'
//  OR
import { create } from 'dashsight'

let dashsightBaseUrl =
  import.meta.env.INSIGHT_BASE_URL || "https://insight.dash.org";

let dashsight = create({
  baseUrl: dashsightBaseUrl,
});

console.log('dashsight', dashsight)

// dashsight.getInstantBalance(address).then(function (info) {
//   console.info(`Current balance is: Đ${info.balance}`);
// });
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
