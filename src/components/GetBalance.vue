<script setup>
import { ref, watch, watchEffect } from "vue";

import Dashsight from "dashsight";
import CrowdNode from "crowdnode";

CrowdNode.init({
    baseUrl: "https://app.crowdnode.io",
    insightBaseUrl: "https://insight.dash.org",
});

let cnBalance = await CrowdNode.http.GetBalance(
    "XmCyQ6qARLWXap74QubFMunngoiiA1QgCL"
);
console.log(cnBalance);

//  OR
// import { create } from 'dashsight'

let dashsightBaseUrl =
    import.meta.env.INSIGHT_BASE_URL || "https://insight.dash.org";

let dashsight = Dashsight.create({
    baseUrl: dashsightBaseUrl,
});

console.log("dashsight", dashsight);

// Pulled from https://github.com/dashhive/dashsight.js/blob/main/examples/addrs.txt
let testAddresses =
    "XmaroZwvCKjsYQQVdCQP2BuWnnMGxWLCGJ XmCyQ6qARLWXap74QubFMunngoiiA1QgCL XaxrcNUS6MrAfsvXNF2s24eChFVKabU6gP XdaWS6gScUjxbFdA8WSFZbeBK2mpGDr6uc XgfQUxiwo7BnTpwxAqpmVJSJwtJHdRCJd2 Xhn6eTCwW94vhVifhshyTeihvTa7LcatiM XnepcKMViJE3bR4ggFkAfLGgqBSr6EjA8z Xp3pqfnYUYLif4SqWFU3Fuv4hJJQRen1ud Xsa1WM9FbRxqSfBxjfFVjLfQ5zinK5NHio Xw2zuXP3VwoRKMoV7cA9TQpJ5bnbCsw13Q XxrK9XH5L3mGCyirz26RpGpCQcJB3v39Lk".split(
        " "
    );

function getInstantBalance() {
    dashsight.getInstantBalance(address.value).then(function (info) {
        balance.value = info.balance;
        console.info(
            `Current balance for "${address.value}" is: Đ${info.balance}`
        );
    });
}

function showBalance() {
    return address.value !== "" && typeof balance.value !== "string";
}
function disableButton() {
    return address.value === "" || address.value.length < 34;
}

const address = ref("");
const balance = ref("");

watch(address, (address, prevAddress) => {
    if (address !== prevAddress) {
        balance.value = "";
    }
});

watchEffect(() => address.value.length === 34 && getInstantBalance());
</script>

<template>
    <div class="card">
        <input
            v-model="address"
            list="test-addresses"
            autocomplete="off"
            placeholder="Enter Đash Address"
        /><br /><br />

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
        >
            Get Balance
        </button>
    </div>
    <div class="card" v-if="showBalance()">
        <h3>Address: {{ address }}</h3>
        <h3>Current balance: Đ{{ balance }}</h3>
    </div>
</template>

<style scoped></style>
