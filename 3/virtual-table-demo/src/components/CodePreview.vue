<template>
  <div class="code-preview">
    <pre><code v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  code: string
  language?: string
}>()

const highlightedCode = computed(() => {
  let code = escapeHtml(props.code)

  code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
  code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')

  code = code.replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|interface|type|extends|implements|new|this|async|await|try|catch|throw|typeof|instanceof|in|of)\b/g, '<span class="keyword">$1</span>')

  code = code.replace(/(['"`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="string">$1$2$1</span>')

  code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')

  code = code.replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="tag">$1</span>')
  code = code.replace(/([a-zA-Z-]+)=/g, '<span class="attr">$1</span>=')

  code = code.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')

  return code
})

const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}
</script>

<style scoped>
.code-preview {
  max-height: 500px;
  overflow-y: auto;
}
</style>
