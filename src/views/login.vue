<template>
  <div class="login">
    login
  </div>
</template>

<script lang="ts">
import { watchEffect } from 'vue';
import { getInfo } from '@/api/user';

watchEffect(() => {
  getInfo().then(res => {
    console.log('res', res);
  })
})
</script>