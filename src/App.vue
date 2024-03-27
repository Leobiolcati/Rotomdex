<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-rotomred text-center relative ...">
    <div>
      <img alt="Rotomdex_Logo" class="mx-auto" src="@/assets/rototo.png" />
    </div>
    <div>
      <img alt="Rotomdex_Title" class="mx-auto" src="@/assets/rototo_title.png" />
    </div>
    <div class="text-center py-2">
      <div>
        <nav>
          <RouterLink
            class="border-r-2 px-2 border-black text-black hover:text-white active:text-rotomlightblue hover:border-black"
            to="/">
            {{ $t('router.wiki') }}
          </RouterLink>
          <RouterLink class="px-2 text-black hover:text-white active:text-rotomlightblue" to="/about">
            {{ $t('router.about') }}
          </RouterLink>
        </nav>
      </div>
    </div>
    <div class="locale-changer py-1 absolute bottom-0 right-0 mr-2 ...">
      <select v-model="$i18n.locale" class="rounded bg-white">
        <option class="hover:bg-rotomlightblue" v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`"
          :value="locale">{{ locale }}</option>
      </select>
    </div>
  </header>
  <div>
    <RouterView />
  </div>
</template>
