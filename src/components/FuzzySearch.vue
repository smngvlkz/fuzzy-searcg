<template>
  <div class="fuzzy-search">
    <div v-if="selectedProduct" class="selected-product">
      <span>{{ selectedProduct.title }}</span>
      <span class="brand">{{ selectedProduct.brand }}</span>
      <div class="clear-icon-wrapper" @click="clearSelection">
        <img src="@/components/icons/red-x-icon.png" alt="Clear" class="clear-icon" />
        <div class="tooltip">Clear selection</div>
      </div>
    </div>
    <SearchInput
      v-else
      v-model="searchQuery"
      :is-loading="isLoading"
    />
    <SearchResults
      v-if="showResults"
      :products="products"
      @select="selectProduct"
    />
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import SearchInput from './SearchInput.vue';
import SearchResults from './SearchResults.vue';
import { useProductSearch } from '../composables/useProductSearch';
import type { Product } from '../types/Product';

const { searchQuery, products, isLoading, error } = useProductSearch();

const selectedProduct = ref<Product | null>(null);

const showResults = computed(() => !selectedProduct.value && products.value.length > 0 && !error.value);

function selectProduct(product: Product) {
  selectedProduct.value = product;
  searchQuery.value = '';
}

function clearSelection() {
  selectedProduct.value = null;
  searchQuery.value = '';
}
</script>

<style scoped>
.fuzzy-search {
  font-family: Arial, sans-serif;
  width: 100%;
  max-width: 400px;
  position: relative;
}

.error-message {
  color: #d32f2f;
  margin-top: 10px;
  font-size: 14px;
}

.selected-product {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 20px;
  position: relative;
  width: 100%;
}

.brand {
  margin-left: 5px;
  color: #666;
  font-size: 14px;
}

.clear-icon-wrapper {
  margin-left: auto;
  position: relative;
  cursor: pointer;
}

.clear-icon {
  width: 20px;
  height: 20px;
}

.tooltip {
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  color: #fff;
  padding: 5px;
  border-radius: 3px;
  font-size: 12px;
  white-space: nowrap;
}

.clear-icon-wrapper:hover .tooltip {
  display: block;
}

.clear-icon-wrapper:hover .clear-icon {
  filter: brightness(1.2);
}
</style>
