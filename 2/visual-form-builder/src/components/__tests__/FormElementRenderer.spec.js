import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormElementRenderer from '../form-elements/FormElementRenderer.vue'

describe('FormElementRenderer', () => {
  it('renders correctly with a text input field', () => {
    const field = {
      id: 'test1',
      type: 'TextInput',
      label: 'Test Input',
      placeholder: 'Enter text',
      required: false,
      helpText: 'This is a test'
    }
    
    const wrapper = mount(FormElementRenderer, {
      props: {
        field,
        isActive: false,
        isPreview: false
      }
    })
    
    expect(wrapper.text()).toContain('Test Input')
  })
})
