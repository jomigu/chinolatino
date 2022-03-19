<template>
  <div>
    <iframe v-if="truck" :src="orderFormUrl + '/chinolatino/' + truck + '/' + email"></iframe>
    <div v-else>
      <ul class="trucks">
        <li v-for="truck in trucks" :key="truck.alias">
          <a :href="'/?truck=' + truck.alias" class="btn btn-primary col-10 col-md-4 btn-lg mb-2">{{ truck.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import trucks from '../data/trucks.json'

const BACKUP_URL = 'https://script.google.com/macros/s/AKfycbx7dSXvmv_lNIualRBwYMBRL1axzE_cFpVyc_QER0h2Q1n0BrkntSTd2_WoJBviY-0g/exec'
const orderFormUrl = process.env.VUE_APP_ORDER_FORM_URL || BACKUP_URL

export default {
  props: {
    truck: {
      type: String
    }
  },
  data() {
    return {
      email: localStorage.getItem('email'),
      orderFormUrl,
      trucks,
    }
  }
}
</script>

<style lang="css">
ul.trucks {
  list-style: none;
  padding-left: 0;
}
</style>