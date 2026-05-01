import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button } from 'primereact/button'
import { useAppStore } from '../store/appStore'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAppStore()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="pi pi-user text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              login({ name: 'Admin User', email: values.email })
              setSubmitting(false)
              navigate('/')
            }, 1000)
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-2 text-sm text-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="mt-2 text-sm text-red-500"
                />
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                label="Sign In"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
              />

              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                Demo credentials: any email + password (min 6 chars)
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Login
