<script setup>
import { computed } from 'vue';

const props = defineProps({
  date: {
    type: String,
    required: true
  }
});

const showDate = computed(() => {
  const date = new Date(props.date);
  return date.toLocaleString('de-CH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',

  });
});
</script>

<template>
  <span>{{ showDate }}</span>
</template>