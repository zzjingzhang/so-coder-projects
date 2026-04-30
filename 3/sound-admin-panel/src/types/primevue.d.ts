import type { Component } from 'vue'

declare module 'primevue/usetoast' {
  export interface ToastMessageOptions {
    severity?: 'success' | 'info' | 'warn' | 'error'
    summary?: string
    detail?: string
    life?: number
  }

  export interface ToastServiceMethods {
    show(options: ToastMessageOptions): void
    info(options: ToastMessageOptions): void
    success(options: ToastMessageOptions): void
    warn(options: ToastMessageOptions): void
    error(options: ToastMessageOptions): void
  }

  export function useToast(): ToastServiceMethods
}

declare module 'primevue/useconfirm' {
  export interface ConfirmationOptions {
    message?: string
    header?: string
    icon?: string
    acceptLabel?: string
    rejectLabel?: string
    acceptClass?: string
    rejectClass?: string
    accept?: () => void
    reject?: () => void
  }

  export interface ConfirmationServiceMethods {
    require(options: ConfirmationOptions): void
    close(): void
  }

  export function useConfirm(): ConfirmationServiceMethods
}

declare module '@primevue/themes/aura' {
  const Aura: any
  export default Aura
}

declare module 'primevue/password' {
  const Password: Component
  export default Password
}

declare module 'primevue/inputtext' {
  const InputText: Component
  export default InputText
}

declare module 'primevue/textarea' {
  const Textarea: Component
  export default Textarea
}

declare module 'primevue/button' {
  const Button: Component
  export default Button
}

declare module 'primevue/card' {
  const Card: Component
  export default Card
}

declare module 'primevue/sidebar' {
  const Sidebar: Component
  export default Sidebar
}

declare module 'primevue/toolbar' {
  const Toolbar: Component
  export default Toolbar
}

declare module 'primevue/datatable' {
  const DataTable: Component
  export default DataTable
}

declare module 'primevue/column' {
  const Column: Component
  export default Column
}

declare module 'primevue/dialog' {
  const Dialog: Component
  export default Dialog
}

declare module 'primevue/dropdown' {
  const Dropdown: Component
  export default Dropdown
}

declare module 'primevue/fileupload' {
  const FileUpload: Component
  export default FileUpload
}

declare module 'primevue/tag' {
  const Tag: Component
  export default Tag
}

declare module 'primevue/toast' {
  const Toast: Component
  export default Toast
}

declare module 'primevue/confirmdialog' {
  const ConfirmDialog: Component
  export default ConfirmDialog
}

declare module 'primevue/skeleton' {
  const Skeleton: Component
  export default Skeleton
}

declare module 'primevue/progressspinner' {
  const ProgressSpinner: Component
  export default ProgressSpinner
}

declare module 'primevue/badge' {
  const Badge: Component
  export default Badge
}

declare module 'primevue/inputswitch' {
  const InputSwitch: Component
  export default InputSwitch
}

declare module 'primevue/avatar' {
  const Avatar: Component
  export default Avatar
}

declare module 'primevue/divider' {
  const Divider: Component
  export default Divider
}

declare module 'primevue/checkbox' {
  const Checkbox: Component
  export default Checkbox
}

declare module 'primevue/message' {
  const Message: Component
  export default Message
}

declare module 'primevue/inlinemessage' {
  const InlineMessage: Component
  export default InlineMessage
}

declare module 'primevue/drawer' {
  const Drawer: Component
  export default Drawer
}
