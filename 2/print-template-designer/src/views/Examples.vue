<template>
  <v-container fluid class="pa-4">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-bold mb-4">打印示例</h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>
              <v-icon left>mdi-barcode</v-icon>
              条码/二维码打印示例
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-4">
            <v-alert type="info" variant="text" class="mb-4">
              以下示例展示了如何在打印模板中使用条码和二维码。
            </v-alert>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h6 font-bold mb-3">一维条码示例</h3>
            <div class="barcode-example p-4 bg-grey-50 rounded-lg mb-4">
              <div ref="barcodeContainer1" class="flex justify-center items-center">
                <canvas ref="barcodeCanvas1"></canvas>
              </div>
              <div class="text-center mt-2 text-sm text-grey-600">
                CODE128 格式条码
              </div>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h6 font-bold mb-3">二维码示例</h3>
            <div class="qrcode-example p-4 bg-grey-50 rounded-lg mb-4">
              <div ref="qrcodeContainer1" class="flex justify-center items-center">
                <canvas ref="qrcodeCanvas1"></canvas>
              </div>
              <div class="text-center mt-2 text-sm text-grey-600">
                二维码内容: https://example.com
              </div>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h6 font-bold mb-3">支持的条码格式</h3>
            <v-chip-group column>
              <v-chip size="small" class="mb-1">CODE128</v-chip>
              <v-chip size="small" class="mb-1">CODE39</v-chip>
              <v-chip size="small" class="mb-1">EAN-13</v-chip>
              <v-chip size="small" class="mb-1">EAN-8</v-chip>
              <v-chip size="small" class="mb-1">UPC-A</v-chip>
              <v-chip size="small" class="mb-1">ITF</v-chip>
              <v-chip size="small" class="mb-1">Codabar</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-toolbar color="secondary" dark>
            <v-toolbar-title>
              <v-icon left>mdi-receipt</v-icon>
              票据定位打印示例
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-4">
            <v-alert type="warning" variant="text" class="mb-4">
              票据定位打印适用于小票打印机，支持精确的位置控制。
            </v-alert>
            
            <v-divider class="my-4"></v-divider>
            
            <h3 class="text-h6 font-bold mb-3">小票打印模板预览</h3>
            <div 
              class="receipt-preview mx-auto bg-white shadow-lg p-4"
              ref="receiptRef"
              style="width: 300px;"
            >
              <div class="text-center mb-4">
                <h4 class="font-bold text-lg">某某商店</h4>
                <p class="text-sm">地址: 某某街道某某号</p>
                <p class="text-sm">电话: 12345678</p>
              </div>
              
              <v-divider></v-divider>
              
              <div class="my-3">
                <p class="text-sm">日期: {{ currentDate }}</p>
                <p class="text-sm">时间: {{ currentTime }}</p>
                <p class="text-sm">单号: {{ receiptNo }}</p>
              </div>
              
              <v-divider></v-divider>
              
              <table class="w-full my-3 text-sm">
                <thead>
                  <tr>
                    <th class="text-left py-1">商品</th>
                    <th class="text-center py-1">数量</th>
                    <th class="text-right py-1">金额</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in receiptItems" :key="index">
                    <td class="py-1">{{ item.name }}</td>
                    <td class="text-center py-1">{{ item.qty }}</td>
                    <td class="text-right py-1">¥{{ item.price.toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
              
              <v-divider></v-divider>
              
              <div class="text-right my-3">
                <p class="text-sm">小计: ¥{{ subtotal.toFixed(2) }}</p>
                <p class="text-sm">税费(10%): ¥{{ tax.toFixed(2) }}</p>
                <p class="font-bold text-lg">总计: ¥{{ total.toFixed(2) }}</p>
              </div>
              
              <v-divider></v-divider>
              
              <div class="text-center mt-4">
                <div ref="qrcodeContainer2" class="flex justify-center items-center mb-2">
                  <canvas ref="qrcodeCanvas2"></canvas>
                </div>
                <p class="text-xs text-grey-500">扫码查询订单</p>
              </div>
              
              <div class="text-center mt-4">
                <p class="text-xs text-grey-500">感谢您的光临！</p>
                <p class="text-xs text-grey-500">欢迎下次再来</p>
              </div>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <v-btn 
              color="primary" 
              block
              @click="printReceipt"
            >
              <v-icon left>mdi-printer</v-icon>
              打印小票
            </v-btn>
            
            <v-alert type="info" variant="text" class="mt-4">
              <strong>定位打印技巧:</strong>
              <ul class="mt-2 text-sm">
                <li>• 使用精确的像素坐标定位元素</li>
                <li>• 设置固定的纸张宽度(如80mm或58mm)</li>
                <li>• 使用相对定位实现精确排版</li>
                <li>• 测试时使用实际打印机验证效果</li>
              </ul>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const barcodeCanvas1 = ref<HTMLCanvasElement | null>(null)
const qrcodeCanvas1 = ref<HTMLCanvasElement | null>(null)
const qrcodeCanvas2 = ref<HTMLCanvasElement | null>(null)
const receiptRef = ref<HTMLElement | null>(null)

const receiptItems = ref([
  { name: '商品A', qty: 2, price: 50.00 },
  { name: '商品B', qty: 1, price: 120.00 },
  { name: '商品C', qty: 3, price: 30.00 },
])

const currentDate = computed(() => new Date().toLocaleDateString('zh-CN'))
const currentTime = computed(() => new Date().toLocaleTimeString('zh-CN'))
const receiptNo = computed(() => 'NO' + Date.now().toString().slice(-10))

const subtotal = computed(() => receiptItems.value.reduce((sum, item) => sum + item.price, 0))
const tax = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + tax.value)

function renderBarcodes(): void {
  if (barcodeCanvas1.value) {
    JsBarcode(barcodeCanvas1.value, '123456789012', {
      format: 'CODE128',
      width: 2,
      height: 60,
      displayValue: true,
      fontSize: 14,
      margin: 0,
    })
  }
}

function renderQRCodes(): void {
  if (qrcodeCanvas1.value) {
    QRCode.toCanvas(qrcodeCanvas1.value, 'https://example.com', {
      width: 150,
      margin: 1,
      errorCorrectionLevel: 'M',
    })
  }
  
  if (qrcodeCanvas2.value) {
    QRCode.toCanvas(qrcodeCanvas2.value, `order:${receiptNo.value}`, {
      width: 80,
      margin: 1,
      errorCorrectionLevel: 'M',
    })
  }
}

async function printReceipt(): Promise<void> {
  if (!receiptRef.value) return
  
  try {
    const canvas = await html2canvas(receiptRef.value, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    })
    
    const imgData = canvas.toDataURL('image/png')
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    })
    
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
    const pdfOutput = pdf.output('bloburl')
    const printWindow = window.open(pdfOutput, '_blank')
    if (printWindow) {
      setTimeout(() => printWindow.print(), 500)
    }
  } catch (error) {
    console.error('Print error:', error)
    alert('打印失败，请重试')
  }
}

onMounted(() => {
  renderBarcodes()
  renderQRCodes()
})
</script>

<style scoped>
.receipt-preview {
  font-family: 'Microsoft YaHei', sans-serif;
  border: 1px dashed #ccc;
}

.receipt-preview table {
  border-collapse: collapse;
}

.receipt-preview th,
.receipt-preview td {
  padding: 2px;
}
</style>
