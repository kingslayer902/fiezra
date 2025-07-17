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
        class="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 shadow-sm cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Beranda
      </RouterLink>
    </div>

    <!-- Controls: Search + Filter + Sort -->
    <div class="flex flex-col md:flex-row gap-3 max-w-md md:max-w-2xl mx-auto mb-8 w-full">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari produk..."
        class="w-full md:flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
      />
      <select
        v-model="selectedCategory"
        class="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
      >
        <option value="">Semua Kategori</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>
      <select
        v-model="sortBy"
        class="w-full md:w-56 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
      >
        <option value="">Urutkan...</option>
        <option value="price-asc">Harga: Termurah</option>
        <option value="price-desc">Harga: Termahal</option>
        <option value="name-asc">Nama: A-Z</option>
        <option value="name-desc">Nama: Z-A</option>
      </select>
    </div>

    <!-- Grid Produk -->
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto" v-if="paginatedProducts.length">
      <div
        v-for="(product, idx) in paginatedProducts"
        :key="product.id"
        class="relative bg-white shadow-md hover:shadow-lg rounded-xl p-3 space-y-2 transition duration-300 hover:scale-[1.015] active:scale-[0.98] cursor-pointer"
        :data-aos="aosEffect(idx)"
      >
        <!-- Badge -->
        <span
          v-if="product.badge"
          class="absolute top-2 left-2 px-2 py-[2px] text-[10px] font-bold rounded-md text-white animate-badge"
          :class="badgeClass(product.badge)"
        >
          {{ product.badge }}
        </span>

        <!-- Gambar -->
        <img
          :src="product.image"
          :alt="product.type"
          loading="lazy"
          class="w-full h-40 object-contain rounded pointer-events-none select-none"
        />

        <!-- Info -->
        <div class="space-y-1 pointer-events-none select-none">
          <h3 class="text-sm font-semibold text-gray-800 truncate">{{ product.type }}</h3>
          <p class="text-xs text-gray-500">{{ product.category }}</p>
          <p class="text-green-600 text-sm font-bold">Rp {{ product.estPrice.toLocaleString() }}</p>
        </div>

        <!-- Tombol WA -->
        <button
          type="button"
          @click="openWhatsApp(product)"
          class="block w-full text-center bg-green-500 hover:bg-green-600 text-white rounded-md py-2 text-sm font-semibold transition duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Tanyakan kepada Penjual
        </button>
      </div>
    </div>

    <!-- Tidak ada hasil -->
    <div v-else class="max-w-6xl mx-auto text-center py-20 text-gray-500">
      Tidak ada produk yang cocok.
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-center gap-2 mt-10">
      <button
        @click="goPrev"
        :disabled="currentPage === 1"
        class="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
      >
        Prev
      </button>
      <button
        v-for="n in totalPages"
        :key="n"
        @click="goTo(n)"
        class="px-3 py-1 text-sm rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
        :class="n === currentPage
          ? 'bg-blue-600 border-blue-600 text-white'
          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100 transition'"
      >
        {{ n }}
      </button>
      <button
        @click="goNext"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 text-sm rounded-md border border-gray-300 bg-white disabled:opacity-40 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition cursor-pointer"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { products } from '../store/productstore'
import { toast } from 'vue3-toastify'
// import 'vue3-toastify/dist/index.css'

const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('')
const currentPage = ref(1)
const pageSize = ref(6)

const categories = [...new Set(products.map(p => p.category))].sort()

const processedProducts = computed(() => {
  let list = [...products]
  if (selectedCategory.value) list = list.filter(p => p.category === selectedCategory.value)
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p => p.type.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
  }
  switch (sortBy.value) {
    case 'price-asc': list.sort((a, b) => a.estPrice - b.estPrice); break
    case 'price-desc': list.sort((a, b) => b.estPrice - a.estPrice); break
    case 'name-asc': list.sort((a, b) => a.type.localeCompare(b.type)); break
    case 'name-desc': list.sort((a, b) => b.type.localeCompare(a.type)); break
  }
  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(processedProducts.value.length / pageSize.value)))
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return processedProducts.value.slice(start, start + pageSize.value)
})

watch([searchQuery, selectedCategory, sortBy], () => currentPage.value = 1)
const goTo = (n) => { if (n >= 1 && n <= totalPages.value) currentPage.value = n }
const goPrev = () => goTo(currentPage.value - 1)
const goNext = () => goTo(currentPage.value + 1)

const badgeClass = (badge) => {
  switch (badge) {
    case 'Promo': return 'bg-red-500'
    case 'Best Seller': return 'bg-yellow-500 text-gray-900'
    case 'Premium': return 'bg-purple-600'
    case 'New': return 'bg-blue-500'
    default: return 'bg-gray-400'
  }
}

const generateWaLink = (product) => {
  const msg = `Halo, saya tertarik dengan produk:\nNama: ${product.type}\nHarga: Rp ${product.estPrice.toLocaleString()}\nApakah masih tersedia?`
  return `https://wa.me/6289505024468?text=${encodeURIComponent(msg)}`
}

/* ULTIMATE TOASTIFY DESIGN */
const openWhatsApp = (product) => {
  toast(`💬 Mengarahkan ke WhatsApp untuk ${product.type}...`, {
    autoClose: 2500,
    position: 'top-center',
    hideProgressBar: true,
    theme: 'colored',
    icon: "📱",
    style: {
      background: "linear-gradient(135deg, #25D366, #128C7E)",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "14px",
      borderRadius: "14px",
      padding: "14px 18px",
      boxShadow: "0 6px 14px rgba(0,0,0,0.25)",
      textAlign: "center",
      animation: "bounceIn 0.8s ease"
    },
    transition: "slide"
  })
  setTimeout(() => {
    window.open(generateWaLink(product), '_blank')
  }, 800)
}

const aosEffect = (idx) => {
  const effects = ['fade-up', 'zoom-in', 'fade-up']
  return effects[idx % effects.length]
}
</script>

<style scoped>
@keyframes badgePulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.9; }
}
.animate-badge {
  animation: badgePulse 2s ease-in-out infinite;
}

/* Animasi Bounce untuk Toast */
@keyframes bounceIn {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}
</style>
