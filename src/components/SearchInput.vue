<template>
  <div class="search-input">
    <span class="search-icon" :class="{ 'loading': isLoading }">
      <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
      <i v-else class="fas fa-search"></i>
    </span>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="Search products..."
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  isLoading: boolean;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style scoped>
.search-input {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 15px;  
  top: 50%;
  transform: translateY(-50%);
  color: #888;
}

input {
  width: 100%;
  padding: 10px 15px 10px 40px; 
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
}

.loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: translateY(-50%) rotate(0deg); }
  100% { transform: translateY(-50%) rotate(360deg); }
}
</style>