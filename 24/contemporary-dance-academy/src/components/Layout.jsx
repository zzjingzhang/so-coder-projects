import { Layout } from 'antd'
import Header from './Header'
import Footer from './Footer'

const { Content } = Layout

const AppLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen bg-black flex flex-col">
      <Header />
      <Content className="flex-1">
        {children}
      </Content>
      <Footer />
    </Layout>
  )
}

export default AppLayout
