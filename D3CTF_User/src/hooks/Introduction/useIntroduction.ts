import { ref } from 'vue';

export const useIntroduction = (text: string, delay: number = 100) => {
  const displayedText = ref<string>('');

  const typeWriterEffect = (index: number) => {
    if (index < text.length) {
      const char = text.charAt(index);
      displayedText.value += char;

      // 如果当前字符是换行符，立即插入换行
      if (char === '\n') {
        // 直接插入换行，不留下任何痕迹
        // 注意：这里的处理仅在逻辑上表示换行，实际不插入任何字符
        // 在Vue模板中，我们将使用v-html来解析换行
      }

      if (index + 1 < text.length) {
        setTimeout(() => typeWriterEffect(index + 1), char === '\n' ? 0 : delay);
      }
    }
  };

  const startTyping = () => {
    displayedText.value = ''; // 清空之前的文本
    typeWriterEffect(0);
  };

  return {
    displayedText,
    startTyping,
  };
};