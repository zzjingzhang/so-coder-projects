export type BlockType = 'heading1' | 'heading2' | 'heading3' | 'paragraph' | 'todo' | 'embed' | 'table' | 'divider'

export interface BlockConfig {
  level?: 1 | 2 | 3
  checked?: boolean
  url?: string
  embedType?: 'iframe' | 'youtube' | 'image'
  rows?: number
  cols?: number
}

export interface Block {
  id: string
  type: BlockType
  content: string
  config: BlockConfig
}

export interface TableCell {
  content: string
}

export interface TableData {
  rows: TableCell[][]
}
