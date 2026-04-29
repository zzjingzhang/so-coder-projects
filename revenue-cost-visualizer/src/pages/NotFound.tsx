import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">页面未找到</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        抱歉，您访问的页面不存在或已被移动。请检查网址是否正确，或返回首页。
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回上一页
        </Button>
      </div>
    </div>
  )
}
