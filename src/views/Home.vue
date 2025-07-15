<template>
  <section class="min-h-screen bg-white flex flex-col justify-center items-center px-6 py-16 text-center relative">
    <!-- Brand dan Logo -->
    <div class="space-y-3" data-aos="fade-down">
      <h1 class="text-4xl font-extrabold text-gray-800 tracking-tight">Fiezra Appliances</h1>

      <!-- Logo WhatsApp dan Tokopedia -->
      <div class="flex justify-center items-center gap-6 mt-2">
        <a href="https://wa.me/6289505024468" target="_blank">
          <img
            src="/logo-wa.png"
            alt="WhatsApp"
            class="w-10 h-10 object-contain hover:scale-110 transition duration-200"
          />
        </a>
        <a href="https://www.tokopedia.com/ezrashop22" target="_blank">
          <img
            src="/logo-tokped.png"
            alt="Tokopedia"
            class="w-10 h-10 object-contain hover:scale-110 transition duration-200"
          />
        </a>
      </div>

      <p class="text-gray-500 text-sm">Solusi Mesin Kopi & Peralatan Premium</p>
    </div>

    <!-- Tombol -->
    <div class="w-full max-w-sm mt-10 space-y-4" data-aos="fade-up">
      <a
        href="https://wa.me/6289505024468"
        target="_blank"
        class="block w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
      >
        Chat via WhatsApp
      </a>

      <a
        href="https://www.tokopedia.com/ezrashop22"
        target="_blank"
        class="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
      >
        Lihat di Tokopedia
      </a>

      <RouterLink
        to="/catalog"
        class="block w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
      >
        Lihat Katalog Produk
      </RouterLink>
    </div>

    <!-- Footer -->
    <footer class="absolute bottom-4 text-xs text-gray-400">© 2025 Fiezra Appliances</footer>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
