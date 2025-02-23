<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const message = ref('');

    onMounted(async () => {
      const response = await fetch('http://localhost:8000/api');
      const data = await response.json();
      message.value = data.message;
    });

    return { message };
  }
});
</script>