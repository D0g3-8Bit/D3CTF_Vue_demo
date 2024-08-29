<template>
    <div class="terminal">
      <div class="output">
        <span v-for="(char, index) in displayedText" :key="index" v-html="char"></span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts" name="Introducion">
  import { defineComponent, onMounted } from 'vue';
  import { useIntroduction } from '@/hooks/Introduction/useIntroduction'; // 根据你的项目结构调整路径
  
  const fullText = "            Welcome to D3CTF \n\n\n\n\n\n\              powered by D0g3";//在这里添加介绍即可
  const { displayedText, startTyping } = useIntroduction(fullText);
  onMounted(() => {
    startTyping();
  });


  </script>
  
  <style scoped>
  .terminal {
    background-color: black;
    color: rgba(241, 245, 241, 0.763);
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    border: 1px solid #052f4dd5;
    width: 450px;
    height: 400px;
    overflow: hidden;
    border-radius: 10px; 
  }
  
  .output {
    white-space: pre;
  }
  </style>