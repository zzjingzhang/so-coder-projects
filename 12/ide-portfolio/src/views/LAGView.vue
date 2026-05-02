<script setup lang="ts">
import { ref, reactive, watch, computed, h } from 'vue'
import { Card, Button, Table, Input, Tag, Modal, message, Tabs, Space } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'
import { LexerGenerator, generateLexerCode } from '@/utils/lexerGenerator'
import { defaultLAGRules, sampleCode } from '@/data/mockData'
import type { LAGRule, LAGToken } from '@/types'

const lexer = ref<LexerGenerator>(new LexerGenerator(defaultLAGRules))

const rules = ref<LAGRule[]>([...defaultLAGRules])
const sourceCode = ref(sampleCode)
const tokens = ref<LAGToken[]>([])
const errors = ref<string[]>([])
const isAnalyzing = ref(false)

const newRule = reactive<LAGRule>({
  name: '',
  pattern: '',
  action: ''
})

const showAddRuleModal = ref(false)
const showGeneratedCode = ref(false)
const generatedCode = ref('')

const activeTab = ref('analyzer')

const tokenColors: Record<string, string> = {
  'KEYWORD': 'blue',
  'IDENTIFIER': 'green',
  'NUMBER': 'orange',
  'STRING': 'purple',
  'OPERATOR': 'red',
  'WHITESPACE': 'default',
  'COMMENT': 'default'
}

const tokenColumns: TableColumnsType = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 150,
    customRender: ({ text }) => {
      const color = tokenColors[text as string] || 'default'
      return h(Tag, { color }, { default: () => text })
    }
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    width: 200,
    customRender: ({ text }) => {
      const displayText = (text as string).length > 40 
        ? (text as string).substring(0, 40) + '...' 
        : text
      return h('code', { 
        class: 'bg-gray-700 px-2 py-1 rounded text-sm text-green-300' 
      }, { default: () => displayText })
    }
  },
  {
    title: 'Line',
    dataIndex: 'line',
    key: 'line',
    width: 80
  },
  {
    title: 'Column',
    dataIndex: 'column',
    key: 'column',
    width: 80
  }
]

const ruleColumns: TableColumnsType = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 150,
    customRender: ({ text }) => {
      return h('span', { class: 'font-mono text-blue-400' }, { default: () => text })
    }
  },
  {
    title: 'Pattern',
    dataIndex: 'pattern',
    key: 'pattern',
    width: 300,
    customRender: ({ text }) => {
      return h('code', { 
        class: 'bg-gray-700 px-2 py-1 rounded text-sm text-yellow-300 font-mono' 
      }, { default: () => text })
    }
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: 120,
    customRender: ({ text }) => {
      const color = text === 'SKIP' ? 'default' : 'green'
      const displayText = text || text === '' ? '-' : text
      return h(Tag, { color }, { default: () => displayText })
    }
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 120,
    customRender: ({ index }) => {
      return h(Space, {}, {
        default: () => [
          h(Button, { 
            type: 'link', 
            size: 'small', 
            danger: true,
            onClick: () => removeRule(index as number)
          }, { default: () => 'Delete' })
        ]
      })
    }
  }
]

const analyzeCode = () => {
  if (!sourceCode.value.trim()) {
    message.warning('Please enter some code to analyze')
    return
  }

  isAnalyzing.value = true
  
  try {
    lexer.value = new LexerGenerator(rules.value)
    const result = lexer.value.tokenize(sourceCode.value)
    tokens.value = result.tokens
    errors.value = result.errors
    
    if (errors.value.length > 0) {
      message.warning(`Found ${errors.value.length} error(s)`)
    } else if (tokens.value.length > 0) {
      message.success(`Successfully tokenized ${tokens.value.length} token(s)`)
    }
  } catch (error) {
    message.error('Invalid regex pattern in rules')
    tokens.value = []
    errors.value = [(error as Error).message]
  } finally {
    isAnalyzing.value = false
  }
}

const addRule = () => {
  if (!newRule.name || !newRule.pattern) {
    message.warning('Please fill in both Name and Pattern')
    return
  }

  try {
    new RegExp(newRule.pattern)
  } catch (error) {
    message.error('Invalid regular expression pattern')
    return
  }

  rules.value.push({
    name: newRule.name,
    pattern: newRule.pattern,
    action: newRule.action || newRule.name
  })

  newRule.name = ''
  newRule.pattern = ''
  newRule.action = ''
  showAddRuleModal.value = false
  message.success('Rule added successfully')
}

const removeRule = (index: number) => {
  rules.value.splice(index, 1)
  message.info('Rule removed')
}

const resetRules = () => {
  rules.value = [...defaultLAGRules]
  message.info('Rules reset to default')
}

const generateCode = () => {
  try {
    generatedCode.value = generateLexerCode(rules.value)
    showGeneratedCode.value = true
  } catch (error) {
    message.error('Failed to generate code')
  }
}

const copyCode = () => {
  navigator.clipboard.writeText(generatedCode.value)
  message.success('Code copied to clipboard!')
}

const tokenStats = computed(() => {
  const stats: Record<string, number> = {}
  tokens.value.forEach(token => {
    stats[token.type] = (stats[token.type] || 0) + 1
  })
  return stats
})

watch([rules, sourceCode], () => {
  // Auto-analyze when rules or code change (optional)
}, { deep: true })
</script>

<template>
  <div class="min-h-full p-4 md:p-6">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-6">
        <h1 class="text-2xl md:text-4xl font-bold text-white mb-2">⚙️ Lexical Analyzer Generator (LAG)</h1>
        <p class="text-gray-400">Define token rules, analyze code, generate lexers</p>
      </div>

      <Tabs v-model:activeKey="activeTab" class="lag-tabs">
        <Tabs.TabPane key="analyzer" tab="Analyzer">
          <div class="grid md:grid-cols-2 gap-4">
            <Card title="Token Rules" class="bg-gray-800/50 border-gray-700">
              <template #extra>
                <Space>
                  <Button size="small" @click="showAddRuleModal = true">
                    + Add Rule
                  </Button>
                  <Button size="small" @click="resetRules">
                    Reset
                  </Button>
                </Space>
              </template>
              
              <Table
                :columns="ruleColumns"
                :data-source="rules"
                :pagination="false"
                size="small"
                rowKey="name"
                class="rules-table"
              />
            </Card>

            <Card title="Source Code" class="bg-gray-800/50 border-gray-700">
              <template #extra>
                <Button type="primary" :loading="isAnalyzing" @click="analyzeCode">
                  🔍 Analyze
                </Button>
              </template>
              
              <Input.TextArea
                v-model:value="sourceCode"
                :rows="16"
                class="font-mono text-sm bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="Enter your code here..."
              />
            </Card>
          </div>

          <div class="mt-6">
            <Card 
              title="Token Output" 
              class="bg-gray-800/50 border-gray-700"
              :extra="
                <Space>
                  <span v-if="tokens.length > 0" class="text-sm text-gray-400">
                    {{ tokens.length }} token(s)
                  </span>
                  <Tag v-if="Object.keys(tokenStats).length > 0" color="blue">
                    Stats: {{ Object.entries(tokenStats).map(([k, v]) => `${k}: ${v}`).join(', ') }}
                  </Tag>
                </Space>
              "
            >
              <div v-if="errors.length > 0" class="mb-4 p-3 bg-red-900/30 border border-red-700 rounded">
                <p class="text-red-400 font-semibold mb-2">Errors:</p>
                <ul class="list-disc list-inside text-red-300 text-sm">
                  <li v-for="(error, idx) in errors" :key="idx">{{ error }}</li>
                </ul>
              </div>

              <Table
                v-if="tokens.length > 0"
                :columns="tokenColumns"
                :data-source="tokens"
                :pagination="{ pageSize: 10 }"
                size="small"
                rowKey="(token) => `${token.line}-${token.column}-${token.value}`"
                class="tokens-table"
              />

              <div v-else-if="!isAnalyzing" class="text-center py-12 text-gray-500">
                <div class="text-4xl mb-4">📝</div>
                <p>Enter some code and click 'Analyze' to see the tokens</p>
              </div>
            </Card>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane key="generator" tab="Code Generator">
          <div class="grid md:grid-cols-2 gap-6">
            <Card title="Current Rules" class="bg-gray-800/50 border-gray-700">
              <div class="space-y-3">
                <div
                  v-for="(rule, index) in rules"
                  :key="index"
                  class="p-3 bg-gray-700/50 rounded-lg"
                >
                  <div class="flex items-center gap-2 mb-2">
                    <Tag color="blue" class="font-mono">{{ rule.name }}</Tag>
                    <span class="text-gray-400">→</span>
                    <Tag :color="rule.action === 'SKIP' ? 'default' : 'green'">
                      {{ rule.action || rule.name }}
                    </Tag>
                  </div>
                  <code class="text-yellow-300 font-mono text-sm bg-gray-800 px-2 py-1 rounded">
                    {{ rule.pattern }}
                  </code>
                </div>
              </div>

              <div class="mt-6">
                <Button type="primary" block size="large" @click="generateCode">
                  📦 Generate Lexer Code
                </Button>
              </div>
            </Card>

            <Card title="About Code Generation" class="bg-gray-800/50 border-gray-700">
              <div class="text-gray-300 space-y-4">
                <p>
                  The Lexical Analyzer Generator (LAG) can generate a complete TypeScript lexer class based on your token rules.
                </p>
                
                <h3 class="text-white font-semibold mt-4">Features:</h3>
                <ul class="list-disc list-inside space-y-1 text-sm">
                  <li>Full TypeScript type definitions</li>
                  <li>Line and column tracking</li>
                  <li>SKIP action for whitespace/comments</li>
                  <li>Error handling for unrecognized characters</li>
                  <li>Easy to use API</li>
                </ul>

                <h3 class="text-white font-semibold mt-4">Usage:</h3>
                <div class="bg-gray-700 p-3 rounded font-mono text-sm">
                  <code class="text-green-300">import GeneratedLexer from './generated-lexer'</code><br>
                  <code class="text-blue-300">const</code> <code class="text-white">lexer = </code><code class="text-green-300">new</code> <code class="text-yellow-300">GeneratedLexer</code><code class="text-white">()</code><br>
                  <code class="text-blue-300">const</code> <code class="text-white">{ tokens, errors } = lexer.</code><code class="text-yellow-300">tokenize</code><code class="text-white">(</code><code class="text-green-300">code</code><code class="text-white">)</code>
                </div>
              </div>
            </Card>
          </div>

          <div class="mt-6">
            <Card title="Quick Presets" class="bg-gray-800/50 border-gray-700">
              <p class="text-gray-400 mb-4">Select a preset to quickly set up rules for common languages:</p>
              <div class="flex flex-wrap gap-3">
                <Button 
                  @click="
                    rules = [
                      { name: 'KEYWORD', pattern: 'if|else|while|for|function|return|var|let|const', action: 'KEYWORD' },
                      { name: 'IDENTIFIER', pattern: '[a-zA-Z_][a-zA-Z0-9_]*', action: 'IDENTIFIER' },
                      { name: 'NUMBER', pattern: '\\\\d+(\\\\.\\\\d+)?', action: 'NUMBER' },
                      { name: 'STRING', pattern: '\"[^\"]*\"|\\'[^\\']*\\'', action: 'STRING' },
                      { name: 'OPERATOR', pattern: '\\\\+|-|\\\\*|/|=|==|!=|<|>|<=|>=', action: 'OPERATOR' },
                      { name: 'WHITESPACE', pattern: '\\\\s+', action: 'SKIP' },
                      { name: 'COMMENT', pattern: '//.*', action: 'SKIP' }
                    ]
                  "
                >
                  JavaScript/TypeScript
                </Button>
                <Button 
                  @click="
                    rules = [
                      { name: 'KEYWORD', pattern: 'def|class|if|else|while|for|return|import|from|as|True|False|None', action: 'KEYWORD' },
                      { name: 'IDENTIFIER', pattern: '[a-zA-Z_][a-zA-Z0-9_]*', action: 'IDENTIFIER' },
                      { name: 'NUMBER', pattern: '\\\\d+(\\\\.\\\\d+)?', action: 'NUMBER' },
                      { name: 'STRING', pattern: '\"[^\"]*\"|\\'[^\\']*\\'|\"\"\"[\\\\s\\\\S]*?\"\"\"|\\'\\'\\'[\\\\s\\\\S]*?\\'\\'', action: 'STRING' },
                      { name: 'OPERATOR', pattern: '\\\\+|-|\\\\*|/|=|==|!=|<|>|<=|>=|and|or|not', action: 'OPERATOR' },
                      { name: 'WHITESPACE', pattern: '\\\\s+', action: 'SKIP' },
                      { name: 'COMMENT', pattern: '#.*', action: 'SKIP' }
                    ]
                  "
                >
                  Python
                </Button>
                <Button 
                  @click="
                    rules = [
                      { name: 'TAG_OPEN', pattern: '<[a-zA-Z][a-zA-Z0-9]*', action: 'TAG_OPEN' },
                      { name: 'TAG_CLOSE', pattern: '</[a-zA-Z][a-zA-Z0-9]*>', action: 'TAG_CLOSE' },
                      { name: 'TAG_SELF_CLOSE', pattern: '/>', action: 'TAG_SELF_CLOSE' },
                      { name: 'ATTRIBUTE', pattern: '[a-zA-Z-]+(?==)', action: 'ATTRIBUTE' },
                      { name: 'STRING', pattern: '\"[^\"]*\"|\\'[^\\']*\\'', action: 'STRING' },
                      { name: 'TEXT', pattern: '[^<>]+', action: 'TEXT' },
                      { name: 'WHITESPACE', pattern: '\\\\s+', action: 'SKIP' }
                    ]
                  "
                >
                  HTML
                </Button>
              </div>
            </Card>
          </div>
        </Tabs.TabPane>

        <Tabs.TabPane key="tests" tab="Test Cases">
          <Card title="LAG Test Cases" class="bg-gray-800/50 border-gray-700">
            <div class="space-y-6">
              <div class="p-4 bg-gray-700/50 rounded-lg">
                <h3 class="text-white font-semibold mb-2">Test 1: Basic Tokenization</h3>
                <p class="text-gray-400 text-sm mb-3">
                  Verify that the lexer correctly identifies keywords, identifiers, numbers, and strings.
                </p>
                <div class="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div class="text-gray-400">// Input:</div>
                  <div class="text-green-300">let x = 42;</div>
                  <div class="text-gray-400 mt-2">// Expected Tokens:</div>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <Tag color="blue">KEYWORD: let</Tag>
                    <Tag color="green">IDENTIFIER: x</Tag>
                    <Tag color="red">OPERATOR: =</Tag>
                    <Tag color="orange">NUMBER: 42</Tag>
                    <Tag color="red">OPERATOR: ;</Tag>
                  </div>
                </div>
              </div>

              <div class="p-4 bg-gray-700/50 rounded-lg">
                <h3 class="text-white font-semibold mb-2">Test 2: Skip Rules</h3>
                <p class="text-gray-400 text-sm mb-3">
                  Verify that whitespace and comments are skipped (not included in token output).
                </p>
                <div class="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div class="text-gray-400">// Input:</div>
                  <div class="text-green-300">// This is a comment</div>
                  <div class="text-green-300">let    y   =   3.14;</div>
                  <div class="text-gray-400 mt-2">// Expected Behavior:</div>
                  <div class="text-yellow-300 mt-1">- Comment should be SKIPPED</div>
                  <div class="text-yellow-300">- Extra whitespace should be SKIPPED</div>
                  <div class="text-yellow-300">- Only 5 tokens should be output</div>
                </div>
              </div>

              <div class="p-4 bg-gray-700/50 rounded-lg">
                <h3 class="text-white font-semibold mb-2">Test 3: Line and Column Tracking</h3>
                <p class="text-gray-400 text-sm mb-3">
                  Verify that each token has correct line and column positions.
                </p>
                <div class="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div class="text-gray-400">// Input:</div>
                  <div class="text-green-300">line1: a</div>
                  <div class="text-green-300">line2: b</div>
                  <div class="text-gray-400 mt-2">// Expected Positions:</div>
                  <div class="text-yellow-300 mt-1">- 'a' should be at line 1, column 7</div>
                  <div class="text-yellow-300">- 'b' should be at line 2, column 7</div>
                </div>
              </div>

              <div class="p-4 bg-gray-700/50 rounded-lg">
                <h3 class="text-white font-semibold mb-2">Test 4: Error Handling</h3>
                <p class="text-gray-400 text-sm mb-3">
                  Verify that unrecognized characters are reported as errors.
                </p>
                <div class="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div class="text-gray-400">// Input:</div>
                  <div class="text-green-300">x @ y</div>
                  <div class="text-gray-400 mt-2">// Expected:</div>
                  <div class="text-yellow-300 mt-1">- '@' should trigger an error</div>
                  <div class="text-yellow-300">- Error should include line and column</div>
                </div>
              </div>

              <div class="p-4 bg-gray-700/50 rounded-lg">
                <h3 class="text-white font-semibold mb-2">Test 5: Invalid Regex Pattern</h3>
                <p class="text-gray-400 text-sm mb-3">
                  Verify that invalid regex patterns in rules are caught.
                </p>
                <div class="bg-gray-800 p-3 rounded font-mono text-sm">
                  <div class="text-gray-400">// Invalid Pattern:</div>
                  <div class="text-red-400">[a-z  (unclosed bracket)</div>
                  <div class="text-gray-400 mt-2">// Expected Behavior:</div>
                  <div class="text-yellow-300 mt-1">- Should throw/return error</div>
                  <div class="text-yellow-300">- Should not crash the application</div>
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
              <h3 class="text-blue-300 font-semibold mb-2">💡 How to Run Tests</h3>
              <p class="text-blue-200 text-sm">
                1. Use the Analyzer tab to test each case manually<br>
                2. Copy the sample input into the code editor<br>
                3. Click 'Analyze' and verify the output matches expected results<br>
                4. Check that line/column positions are correct
              </p>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>

    <Modal
      v-model:open="showAddRuleModal"
      title="Add New Token Rule"
      @ok="addRule"
      okText="Add Rule"
    >
      <div class="space-y-4 mt-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Token Name</label>
          <Input
            v-model:value="newRule.name"
            placeholder="e.g., KEYWORD, IDENTIFIER"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Regex Pattern</label>
          <Input
            v-model:value="newRule.pattern"
            placeholder="e.g., [a-zA-Z_][a-zA-Z0-9_]*"
          />
          <p class="text-xs text-gray-500 mt-1">Enter a valid JavaScript regular expression pattern</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">Action (Optional)</label>
          <Input
            v-model:value="newRule.action"
            placeholder="e.g., SKIP (to ignore this token)"
          />
          <p class="text-xs text-gray-500 mt-1">Use 'SKIP' to ignore whitespace/comments, or leave empty to use token name</p>
        </div>
      </div>
    </Modal>

    <Modal
      v-model:open="showGeneratedCode"
      title="Generated Lexer Code"
      :width="800"
      :footer="[
        h(Button, { key: 'copy', type: 'primary', onClick: copyCode }, { default: () => '📋 Copy to Clipboard' }),
        h(Button, { key: 'close', onClick: () => { showGeneratedCode = false } }, { default: () => 'Close' })
      ]"
    >
      <div class="mt-4">
        <pre class="bg-gray-900 p-4 rounded-lg overflow-auto max-h-96 text-sm font-mono text-gray-300">
{{ generatedCode }}
        </pre>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
:deep(.ant-tabs-nav) {
  background-color: #374151 !important;
  padding: 0 16px !important;
  border-radius: 8px 8px 0 0 !important;
}

:deep(.ant-tabs-tab) {
  color: #9ca3af !important;
}

:deep(.ant-tabs-tab-active) {
  color: #3b82f6 !important;
}

:deep(.ant-tabs-ink-bar) {
  background-color: #3b82f6 !important;
}

:deep(.ant-card-head) {
  background-color: #374151 !important;
  border-bottom-color: #4b5563 !important;
}

:deep(.ant-card-head-title) {
  color: #f3f4f6 !important;
}

:deep(.ant-table) {
  background-color: transparent !important;
}

:deep(.ant-table-thead > tr > th) {
  background-color: #374151 !important;
  color: #f3f4f6 !important;
  border-color: #4b5563 !important;
}

:deep(.ant-table-tbody > tr > td) {
  background-color: #1f2937 !important;
  color: #d1d5db !important;
  border-color: #374151 !important;
}

:deep(.ant-table-tbody > tr:hover > td) {
  background-color: #374151 !important;
}

:deep(.ant-pagination-item) {
  background-color: #374151 !important;
  border-color: #4b5563 !important;
}

:deep(.ant-pagination-item a) {
  color: #9ca3af !important;
}

:deep(.ant-pagination-item-active) {
  border-color: #3b82f6 !important;
}

:deep(.ant-pagination-item-active a) {
  color: #3b82f6 !important;
}

:deep(.ant-modal-content) {
  background-color: #1f2937 !important;
}

:deep(.ant-modal-header) {
  background-color: #374151 !important;
  border-color: #4b5563 !important;
}

:deep(.ant-modal-title) {
  color: #f3f4f6 !important;
}

:deep(.ant-form-item-label > label) {
  color: #d1d5db !important;
}
</style>
