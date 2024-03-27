<script setup>
import TextSection from '../components/modules/TextSection.vue'
</script>

<template>
  <div class="bg-gradient-to-b from-white to-rotomlightblue p-10 flex flex-col items-center space-y-5">
    <TextSection>
      <template #title>{{ $t('test.section_title') }}</template>
      <template #paragraph>{{ $t('test.section_text') }}</template>
    </TextSection>
    <br>
    <TextSection>
      <template #title>{{ $t('test.section_title') }}</template>
      <template #paragraph>{{ $t('test.section_text') }}</template>
    </TextSection>
    <br>
    <TextSection>
      <template #title>{{ $t('test.section_title') }}</template>
      <template #paragraph>{{ $t('test.section_text') }}</template>
    </TextSection>
    <br>
    <TextSection>
      <template #title>{{ $t('test.section_title') }}</template>
      <template #paragraph>{{ $t('test.section_text') }}</template>
    </TextSection>
    <br>
    <TextSection>
      <template #title>{{ $t('test.section_title') }}</template>
      <template #paragraph>{{ $t('test.section_text') }}</template>
    </TextSection>
  </div>
</template>
