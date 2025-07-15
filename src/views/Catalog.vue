<template>
  <section class="min-h-screen bg-gray-100 px-4 py-10 text-gray-800">
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-3xl font-extrabold">Katalog Produk</h2>
      <p class="text-gray-500 mt-1">Temukan mesin kopi & peralatan terbaik kami</p>
    </div>

    <!-- Tombol Kembali -->
    <div class="flex justify-center mb-6">
      <RouterLink
        to="/"
        class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition duration-200 shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Beranda
      </RouterLink>
    </div>

    <!-- Grid Produk -->
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white shadow-md hover:shadow-lg rounded-xl p-3 space-y-2 transition duration-300"
        data-aos="fade-up"
      >
        <img
          :src="product.image"
          :alt="product.type"
          class="w-full h-40 object-contain rounded"
        />
        <div class="space-y-1">
          <h3 class="text-sm font-semibold text-gray-800 truncate">{{ product.type }}</h3>
          <p class="text-xs text-gray-500">{{ product.category }}</p>
          <p class="text-green-600 text-sm font-bold">Rp {{ product.estPrice.toLocaleString() }}</p>
        </div>
        <a
          :href="generateWaLink(product)"
          target="_blank"
          class="block w-full text-center bg-green-500 hover:bg-green-600 text-white rounded-md py-2 text-sm font-semibold transition duration-200"
        >
          Tanyakan kepada Penjual
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { products } from '../store/productstore'

const generateWaLink = (product) => {
  return `https://wa.me/6289505024468?text=Halo%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.type)}.%20Boleh%20tanya-tanya?`
}
</script>
