<script setup lang="ts">
import { ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent :is-menu-open="isMenuOpen" @toggle-menu="toggleMenu" />

    <main class="flex-grow pt-28">
      <section class="bg-black text-white py-16">
        <div class="container-custom text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">关于我们</h1>
          <p class="text-gray-300 text-lg">街头文化，态度表达</p>
        </div>
      </section>

      <section class="py-16 bg-white">
        <div class="container-custom">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 class="text-3xl font-bold mb-6 text-black">品牌故事</h2>
              <p class="text-gray-700 mb-4 leading-relaxed">
                Urban Threads
                诞生于城市街头，致力于将街头文化与时尚设计完美融合。我们相信，服装不仅仅是穿着，更是一种态度的表达，一种身份的象征。
              </p>
              <p class="text-gray-700 mb-4 leading-relaxed">
                自2018年创立以来，我们始终坚持原创设计，关注品质细节，为热爱街头文化的年轻人提供独特的穿搭选择。从城市街头到时尚舞台，Urban
                Threads 正在定义新一代的街头时尚。
              </p>
              <p class="text-gray-700 leading-relaxed">
                我们的设计灵感来源于都市生活的方方面面：涂鸦艺术、滑板文化、嘻哈音乐、地下艺术场景...
                每一件作品都承载着对街头文化的热爱与敬意。
              </p>
            </div>
            <div class="relative">
              <div
                class="absolute -top-4 -left-4 w-full h-full border-4 border-red"
              ></div>
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=urban%20streetwear%20brand%20store%20interior%20with%20black%20and%20white%20aesthetic%20red%20accents&image_size=landscape_4_3"
                alt="品牌故事"
                class="relative z-10 w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 bg-gray-100">
        <div class="container-custom">
          <h2 class="text-3xl font-bold mb-12 text-center text-black">
            我们的价值观
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              class="bg-white p-8 text-center group hover:bg-black hover:text-white transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-red text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-white group-hover:text-red transition-all duration-300"
              >
                01
              </div>
              <h3 class="text-xl font-bold mb-4">原创设计</h3>
              <p
                class="text-gray-600 group-hover:text-gray-300 transition-colors duration-300"
              >
                每一件作品都由我们的设计团队原创打造，拒绝平庸，追求独特。
              </p>
            </div>
            <div
              class="bg-white p-8 text-center group hover:bg-black hover:text-white transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-red text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-white group-hover:text-red transition-all duration-300"
              >
                02
              </div>
              <h3 class="text-xl font-bold mb-4">品质至上</h3>
              <p
                class="text-gray-600 group-hover:text-gray-300 transition-colors duration-300"
              >
                精选面料，精湛工艺，每一个细节都经过严格把控。
              </p>
            </div>
            <div
              class="bg-white p-8 text-center group hover:bg-black hover:text-white transition-all duration-300"
            >
              <div
                class="w-16 h-16 bg-red text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 group-hover:bg-white group-hover:text-red transition-all duration-300"
              >
                03
              </div>
              <h3 class="text-xl font-bold mb-4">街头精神</h3>
              <p
                class="text-gray-600 group-hover:text-gray-300 transition-colors duration-300"
              >
                源于街头，忠于街头，传递真实的街头文化态度。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <FooterComponent />
  </div>
</template>
