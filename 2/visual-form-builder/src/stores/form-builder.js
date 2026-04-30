import { defineStore } from 'pinia'
import { ref } from 'vue'
import { FORM_ELEMENTS, THEMING_DEFAULTS } from '@/config/form-elements'

export const useFormBuilderStore = defineStore('formBuilder', () => {
  const forms = ref([])
  const activeForm = ref(null)
  const activeTabForFields = ref('Elements')
  const themingVars = ref({ ...THEMING_DEFAULTS })

  function addForm(elementType) {
    const config = FORM_ELEMENTS[elementType]
    if (!config) return

    if (config.isUnique) {
      const exists = forms.value.some(f => f.type === elementType)
      if (exists) return false
    }

    const newForm = {
      id: Date.now().toString(),
      type: elementType,
      ...config.defaultProps
    }
    forms.value.push(newForm)
    return true
  }

  function removeForm(formId) {
    const index = forms.value.findIndex(f => f.id === formId)
    if (index !== -1) {
      forms.value.splice(index, 1)
      if (activeForm.value?.id === formId) {
        activeForm.value = null
      }
    }
  }

  function cloneForm(formId) {
    const form = forms.value.find(f => f.id === formId)
    if (form) {
      const config = FORM_ELEMENTS[form.type]
      if (config?.isUnique) {
        return false
      }
      const cloned = {
        ...form,
        id: Date.now().toString()
      }
      const index = forms.value.findIndex(f => f.id === formId)
      forms.value.splice(index + 1, 0, cloned)
      return true
    }
    return false
  }

  function setActiveForm(form) {
    activeForm.value = form
  }

  function updateForm(formId, props) {
    const form = forms.value.find(f => f.id === formId)
    if (form) {
      Object.assign(form, props)
    }
  }

  function updateThemingVars(newVars) {
    themingVars.value = { ...themingVars.value, ...newVars }
  }

  function applyTheming() {
    const root = document.documentElement
    Object.entries(themingVars.value).forEach(([key, value]) => {
      const cssVar = `--theme-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVar, value)
    })
  }

  return {
    forms,
    activeForm,
    activeTabForFields,
    themingVars,
    addForm,
    removeForm,
    cloneForm,
    setActiveForm,
    updateForm,
    updateThemingVars,
    applyTheming
  }
})
