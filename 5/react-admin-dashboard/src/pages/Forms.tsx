import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'
import { RadioButton } from 'primereact/radiobutton'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

const UserSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  role: Yup.string()
    .required('Role is required'),
  bio: Yup.string()
    .max(500, 'Bio must be 500 characters or less'),
})

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]

const Forms: React.FC = () => {
  const [checked, setChecked] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const toast = React.useRef<Toast>(null)

  const showSuccess = () => {
    toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Form submitted successfully', life: 3000 })
  }

  return (
    <div className="space-y-6">
      <Toast ref={toast} />
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Forms</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Form handling examples</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">User Registration</h2>
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', role: '', bio: '' }}
            validationSchema={UserSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                console.log('Form values:', values)
                setSubmitting(false)
                resetForm()
                showSuccess()
              }, 1000)
            }}
          >
            {({ isSubmitting, values, setFieldValue, errors, touched }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <Field name="firstName" as={InputText} className={`w-full ${errors.firstName && touched.firstName ? 'p-invalid' : ''}`} />
                    <ErrorMessage name="firstName" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <Field name="lastName" as={InputText} className={`w-full ${errors.lastName && touched.lastName ? 'p-invalid' : ''}`} />
                    <ErrorMessage name="lastName" component="p" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <Field name="email" as={InputText} type="email" className={`w-full ${errors.email && touched.email ? 'p-invalid' : ''}`} />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <Dropdown
                    value={values.role}
                    onChange={(e) => setFieldValue('role', e.value)}
                    options={roleOptions}
                    placeholder="Select a role"
                    className={`w-full ${errors.role && touched.role ? 'p-invalid' : ''}`}
                  />
                  <ErrorMessage name="role" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <Field name="bio" as={InputTextarea} rows={4} className="w-full" />
                  <ErrorMessage name="bio" component="p" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="pt-4">
                  <Button type="submit" loading={isSubmitting} label="Submit" className="w-full bg-blue-500 hover:bg-blue-600" />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Other Form Elements</h2>

          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Checkbox</h3>
            <div className="flex items-center gap-2">
              <Checkbox
                inputId="notification"
                checked={checked}
                onChange={(e) => setChecked(e.checked || false)}
              />
              <label htmlFor="notification" className="text-gray-700 dark:text-gray-300">
                Receive email notifications
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Radio Buttons</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="option1"
                  name="options"
                  value="option1"
                  onChange={(e) => setSelectedValue(e.value)}
                  checked={selectedValue === 'option1'}
                />
                <label htmlFor="option1" className="text-gray-700 dark:text-gray-300">Option 1</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="option2"
                  name="options"
                  value="option2"
                  onChange={(e) => setSelectedValue(e.value)}
                  checked={selectedValue === 'option2'}
                />
                <label htmlFor="option2" className="text-gray-700 dark:text-gray-300">Option 2</label>
              </div>
              <div className="flex items-center gap-2">
                <RadioButton
                  inputId="option3"
                  name="options"
                  value="option3"
                  onChange={(e) => setSelectedValue(e.value)}
                  checked={selectedValue === 'option3'}
                />
                <label htmlFor="option3" className="text-gray-700 dark:text-gray-300">Option 3</label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Disabled States</h3>
            <div className="space-y-4">
              <InputText placeholder="Disabled input" disabled className="w-full" />
              <Button label="Disabled button" disabled className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forms
