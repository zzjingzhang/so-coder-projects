export const FORM_ELEMENTS = {
  TextInput: {
    type: 'TextInput',
    label: '文本输入',
    icon: 'input',
    isUnique: false,
    defaultProps: {
      label: '文本输入',
      placeholder: '请输入',
      required: false,
      helpText: ''
    }
  },
  Textarea: {
    type: 'Textarea',
    label: '长文本',
    icon: 'chatbox',
    isUnique: false,
    defaultProps: {
      label: '长文本',
      placeholder: '请输入',
      required: false,
      helpText: '',
      rows: 4
    }
  },
  NumberInput: {
    type: 'NumberInput',
    label: '数字输入',
    icon: 'number',
    isUnique: false,
    defaultProps: {
      label: '数字输入',
      placeholder: '请输入',
      required: false,
      helpText: '',
      min: null,
      max: null
    }
  },
  Select: {
    type: 'Select',
    label: '下拉列表',
    icon: 'chevron-down',
    isUnique: false,
    defaultProps: {
      label: '下拉列表',
      placeholder: '请选择',
      required: false,
      helpText: '',
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' }
      ]
    }
  },
  Radio: {
    type: 'Radio',
    label: '单选框',
    icon: 'radio',
    isUnique: false,
    defaultProps: {
      label: '单选框',
      required: false,
      helpText: '',
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' }
      ]
    }
  },
  Checkbox: {
    type: 'Checkbox',
    label: '复选框',
    icon: 'checkbox',
    isUnique: false,
    defaultProps: {
      label: '复选框',
      required: false,
      helpText: '',
      options: [
        { label: '选项一', value: 'option1' },
        { label: '选项二', value: 'option2' },
        { label: '选项三', value: 'option3' }
      ]
    }
  },
  DateTime: {
    type: 'DateTime',
    label: '日期/时间',
    icon: 'calendar',
    isUnique: false,
    defaultProps: {
      label: '日期/时间',
      placeholder: '请选择',
      required: false,
      helpText: '',
      inputType: 'date'
    }
  },
  Rating: {
    type: 'Rating',
    label: '评分',
    icon: 'star',
    isUnique: false,
    defaultProps: {
      label: '评分',
      required: false,
      helpText: '',
      max: 5
    }
  },
  Button: {
    type: 'Button',
    label: '按钮',
    icon: 'rocket',
    isUnique: true,
    defaultProps: {
      label: '提交',
      buttonType: 'primary'
    }
  },
  TextEditor: {
    type: 'TextEditor',
    label: '富文本',
    icon: 'document-text',
    isUnique: true,
    defaultProps: {
      label: '富文本编辑器',
      required: false,
      helpText: ''
    }
  }
}

export const THEMING_DEFAULTS = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontColor: '#333333',
  linkColor: '#3b82f6',
  fontSize: '14px',
  labelColor: '#374151',
  labelFontSize: '14px',
  labelMarginBottom: '8px',
  helpTextColor: '#6b7280',
  helpTextFontSize: '12px',
  helpTextMarginTop: '4px',
  inputBorderColor: '#d1d5db',
  inputBorderRadius: '6px',
  inputHoverColor: '#9ca3af',
  inputFocusColor: '#3b82f6',
  inputShadowColor: 'rgba(59, 130, 246, 0.1)',
  buttonBgColor: '#3b82f6',
  buttonBorderColor: '#3b82f6',
  buttonTextColor: '#ffffff'
}
