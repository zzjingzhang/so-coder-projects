import type { TerminalCommand, TerminalContext, FileNode } from '@/types'
import { fileSystem } from '@/data/mockData'

function findNodeByPath(nodes: FileNode[], path: string): FileNode | null {
  const parts = path.split('/').filter(p => p)
  
  if (parts.length === 0) {
    return { name: '/', type: 'folder', path: '/', children: fileSystem }
  }
  
  let current: FileNode | null = null
  let searchNodes = fileSystem
  
  for (const part of parts) {
    current = searchNodes.find(n => n.name === part) || null
    if (!current) return null
    searchNodes = current.children || []
  }
  
  return current
}

function listDirectory(context: TerminalContext): string[] {
  const node = findNodeByPath(fileSystem, context.currentPath)
  if (!node || node.type !== 'folder') {
    return [`ls: ${context.currentPath}: Not a directory`]
  }
  
  const children = node.children || []
  const output: string[] = []
  
  children.forEach(child => {
    if (child.type === 'folder') {
      output.push(`\x1b[34m${child.name}/\x1b[0m`)
    } else {
      output.push(child.name)
    }
  })
  
  return output
}

function changeDirectory(args: string[], context: TerminalContext): string[] {
  if (args.length === 0) {
    context.currentPath = '/'
    return []
  }
  
  let targetPath = args[0]
  
  if (targetPath === '..') {
    const parts = context.currentPath.split('/').filter(p => p)
    parts.pop()
    context.currentPath = '/' + parts.join('/')
    return []
  }
  
  if (targetPath === '.') {
    return []
  }
  
  if (!targetPath.startsWith('/')) {
    targetPath = context.currentPath === '/' 
      ? `/${targetPath}` 
      : `${context.currentPath}/${targetPath}`
  }
  
  const targetNode = findNodeByPath(fileSystem, targetPath)
  if (!targetNode) {
    return [`cd: ${args[0]}: No such file or directory`]
  }
  
  if (targetNode.type !== 'folder') {
    return [`cd: ${args[0]}: Not a directory`]
  }
  
  context.currentPath = targetPath
  return []
}

function openFile(args: string[], context: TerminalContext): string[] {
  if (args.length === 0) {
    return ['Usage: open <file>']
  }
  
  let targetPath = args[0]
  
  if (!targetPath.startsWith('/')) {
    targetPath = context.currentPath === '/' 
      ? `/${targetPath}` 
      : `${context.currentPath}/${targetPath}`
  }
  
  const targetNode = findNodeByPath(fileSystem, targetPath)
  if (!targetNode) {
    return [`open: ${args[0]}: No such file or directory`]
  }
  
  if (targetNode.type === 'folder') {
    return [`open: ${args[0]}: Is a directory`]
  }
  
  return [
    `Opening ${targetNode.name}...`,
    `Use the file explorer to view ${targetPath}`
  ]
}

function showHelp(): string[] {
  return [
    'Available commands:',
    '',
    '  ls                List directory contents',
    '  cd <dir>          Change directory',
    '  open <file>       Open a file',
    '  clear             Clear terminal',
    '  history           Show command history',
    '  help              Show this help message',
    '  pwd               Print working directory',
    '  whoami            Display current user',
    '  date              Show current date',
    '  echo <text>       Display a line of text',
    '  lag               Show Lexical Analyzer Generator info',
    '',
    'Type "help <command>" for more information about a command.'
  ]
}

function printWorkingDirectory(context: TerminalContext): string[] {
  return [context.currentPath]
}

function whoami(): string[] {
  return ['developer']
}

function showDate(): string[] {
  return [new Date().toString()]
}

function echo(args: string[]): string[] {
  return [args.join(' ')]
}

function showHistory(context: TerminalContext): string[] {
  if (context.history.length === 0) {
    return ['No commands in history']
  }
  
  return context.history.map((cmd, index) => `${index + 1}  ${cmd}`)
}

function showLAGInfo(): string[] {
  return [
    '',
    '  ╔══════════════════════════════════════════════════════════════╗',
    '  ║                     LEXICAL ANALYZER GENERATOR                ║',
    '  ║                            (LAG)                               ║',
    '  ╚══════════════════════════════════════════════════════════════╝',
    '',
    '  LAG is a powerful tool that generates lexical analyzers (scanners)',
    '  from regular expression rules. It transforms your token definitions',
    '  into efficient tokenizers for your programming language or DSL.',
    '',
    '  Features:',
    '  ├── Custom token rules with regex patterns',
    '  ├── Token type classification',
    '  ├── Line and column tracking',
    '  ├── Skip rules for whitespace and comments',
    '  └── Interactive testing interface',
    '',
    '  To use LAG, navigate to the "LAG" view in the file explorer or',
    '  click on the LAG tab in the editor.',
    '',
    '  Example usage:',
    '  ├── Define rules: KEYWORD -> if|else|while',
    '  ├── Test with sample code',
    '  └── View generated tokens',
    ''
  ]
}

export const commands: Record<string, TerminalCommand> = {
  ls: {
    name: 'ls',
    description: 'List directory contents',
    usage: 'ls [options] [directory]',
    execute: (_, context) => listDirectory(context)
  },
  cd: {
    name: 'cd',
    description: 'Change the current working directory',
    usage: 'cd <directory>',
    execute: (args, context) => changeDirectory(args, context)
  },
  open: {
    name: 'open',
    description: 'Open a file in the editor',
    usage: 'open <file>',
    execute: (args, context) => openFile(args, context)
  },
  clear: {
    name: 'clear',
    description: 'Clear the terminal screen',
    usage: 'clear',
    execute: () => ['__CLEAR__']
  },
  help: {
    name: 'help',
    description: 'Display help information',
    usage: 'help [command]',
    execute: () => showHelp()
  },
  pwd: {
    name: 'pwd',
    description: 'Print working directory',
    usage: 'pwd',
    execute: (_, context) => printWorkingDirectory(context)
  },
  whoami: {
    name: 'whoami',
    description: 'Print current user',
    usage: 'whoami',
    execute: () => whoami()
  },
  date: {
    name: 'date',
    description: 'Print current date and time',
    usage: 'date',
    execute: () => showDate()
  },
  echo: {
    name: 'echo',
    description: 'Display a line of text',
    usage: 'echo [text]',
    execute: (args) => echo(args)
  },
  history: {
    name: 'history',
    description: 'Display command history',
    usage: 'history',
    execute: (_, context) => showHistory(context)
  },
  lag: {
    name: 'lag',
    description: 'Show Lexical Analyzer Generator information',
    usage: 'lag',
    execute: () => showLAGInfo()
  }
}

export function executeCommand(input: string, context: TerminalContext): { output: string[], isClear: boolean } {
  const trimmed = input.trim()
  if (!trimmed) {
    return { output: [], isClear: false }
  }
  
  const parts = trimmed.split(/\s+/)
  const commandName = parts[0].toLowerCase()
  const args = parts.slice(1)
  
  const command = commands[commandName]
  
  if (!command) {
    return { 
      output: [`bash: ${commandName}: command not found. Type "help" for available commands.`],
      isClear: false 
    }
  }
  
  const output = command.execute(args, context)
  
  if (output.includes('__CLEAR__')) {
    return { output: [], isClear: true }
  }
  
  return { output, isClear: false }
}

export function createInitialContext(): TerminalContext {
  return {
    currentPath: '/',
    fileSystem: [...fileSystem],
    history: []
  }
}
