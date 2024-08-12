<template>
  <div class="search-container">
    <div v-if="loading" class="loader">Loading...</div>
    <div v-else-if="products.length > 0" class="search-results">
      <div v-for="product in products" :key="product.id" class="product-item" @click="$emit('select', product)">
        <img :src="product.thumbnail" :alt="product.title" />
        <div class="product-info">
          <span class="product-title">{{ product.title }}</span>
          <div class="product-rating">
            <img v-for="n in Math.floor(product.rating)" :key="n" src="@/components/icons/golden-star.png" alt="Star" class="star-icon" />
            <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
          </div>
        </div>
        <span class="product-price">${{ product.price.toFixed(2) }}</span>
      </div>
    </div>
    <div v-else class="no-results">No results found</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Product } from '../types/Product';

const props = defineProps<{
  products: Product[];
  loading: boolean; 
}>();

const emit = defineEmits<{
  (e: 'select', product: Product): void;
}>();
</script>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
}

.loader {
  margin-right: 10px;
}

.search-results {
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  flex-grow: 1;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.product-item:hover {
  background-color: #f5f5f5;
}

img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 4px;
}

.product-info {
  flex-grow: 1;
}

.product-title {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.product-rating {
  display: flex;
  align-items: center;
}

.star-icon {
  width: 18px;
  height: 18px;
  margin-right: 2px;
}

.rating-value {
  margin-left: 5px;
  font-size: 14px;
  color: #666;
}

.product-price {
  font-weight: bold;
  color: #4caf50;
}

.no-results {
  padding: 10px;
  text-align: center;
  color: #666;
}
</style>
