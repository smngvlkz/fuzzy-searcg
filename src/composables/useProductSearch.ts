import { ref, watch } from 'vue';
import { useDebounce } from '@vueuse/core';
import type { Product } from '../types/Product';

export function useProductSearch() {
  const searchQuery = ref('');
  const debouncedQuery = useDebounce(searchQuery, 300);
  const products = ref<Product[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function searchProducts() {
    if (!debouncedQuery.value) {
      products.value = [];
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery.value)}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      products.value = data.products;
    } catch (err) {
      error.value = 'An error occurred while searching for products. Please try again.';
      products.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  watch(debouncedQuery, () => {
    searchProducts();
  });

  return {
    searchQuery,
    products,
    isLoading,
    error,
  };
}