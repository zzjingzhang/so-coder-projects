import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  describe('渲染', () => {
    it('应该渲染密码输入框', () => {
      render(<PasswordInput placeholder="请输入密码" />)
      expect(screen.getByPlaceholderText('请输入密码')).toBeInTheDocument()
    })

    it('应该渲染可见性切换按钮', () => {
      render(<PasswordInput />)
      const button = screen.getByRole('button', { name: /显示密码|隐藏密码/i })
      expect(button).toBeInTheDocument()
    })

    it('应该显示 hintText', () => {
      render(<PasswordInput hintText="至少8个字符" />)
      expect(screen.getByText('至少8个字符')).toBeInTheDocument()
    })

    it('应该显示 floatingLabelText', () => {
      render(<PasswordInput floatingLabelText="密码" />)
      expect(screen.getByText('密码')).toBeInTheDocument()
    })

    it('应该显示 errorText', () => {
      render(<PasswordInput errorText="密码不能为空" />)
      expect(screen.getByText('密码不能为空')).toBeInTheDocument()
    })

    it('当 fullWidth 为 true 时应该占满宽度', () => {
      const { container } = render(<PasswordInput fullWidth />)
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('w-full')
    })
  })

  describe('默认隐藏状态', () => {
    it('默认情况下应该是密码类型', () => {
      const { container } = render(<PasswordInput />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('默认情况下按钮应该显示"显示密码"', () => {
      render(<PasswordInput />)
      expect(screen.getByRole('button', { name: '显示密码' })).toBeInTheDocument()
    })
  })

  describe('道具驱动的可见性更改', () => {
    it('当 visible 为 true 时应该显示密码', () => {
      const { container } = render(<PasswordInput visible={true} />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('当 visible 为 false 时应该隐藏密码', () => {
      const { container } = render(<PasswordInput visible={false} />)
      const input = container.querySelector('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('当 visible 改变时应该触发 onVisibleChange', () => {
      const onVisibleChange = vi.fn()
      render(<PasswordInput visible={false} onVisibleChange={onVisibleChange} />)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onVisibleChange).toHaveBeenCalledTimes(1)
      expect(onVisibleChange).toHaveBeenCalledWith(true)
    })
  })

  describe('按钮禁用', () => {
    it('当 buttonDisabled 为 true 时按钮应该被禁用', () => {
      render(<PasswordInput buttonDisabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('当 disabled 为 true 时按钮应该被禁用', () => {
      render(<PasswordInput disabled={true} />)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('当按钮被禁用时点击不应该切换可见性', () => {
      const onVisibleChange = vi.fn()
      render(
        <PasswordInput buttonDisabled={true} onVisibleChange={onVisibleChange} />
      )
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      
      expect(onVisibleChange).not.toHaveBeenCalled()
    })
  })

  describe('切换行为', () => {
    it('点击按钮应该在密码和文本之间切换', () => {
      const { container } = render(<PasswordInput />)
      const input = container.querySelector('input')
      const button = screen.getByRole('button')
      
      expect(input).toHaveAttribute('type', 'password')
      
      fireEvent.click(button)
      expect(input).toHaveAttribute('type', 'text')
      
      fireEvent.click(button)
      expect(input).toHaveAttribute('type', 'password')
    })

    it('点击按钮应该更新 aria-label', () => {
      render(<PasswordInput />)
      const button = screen.getByRole('button')
      
      expect(button).toHaveAttribute('aria-label', '显示密码')
      
      fireEvent.click(button)
      expect(button).toHaveAttribute('aria-label', '隐藏密码')
    })

    it('切换时应该调用 onVisibleChange', () => {
      const onVisibleChange = vi.fn()
      render(<PasswordInput onVisibleChange={onVisibleChange} />)
      
      const button = screen.getByRole('button')
      
      fireEvent.click(button)
      expect(onVisibleChange).toHaveBeenCalledWith(true)
      
      fireEvent.click(button)
      expect(onVisibleChange).toHaveBeenCalledWith(false)
    })
  })

  describe('受控和非受控使用', () => {
    it('应该支持非受控输入', () => {
      render(<PasswordInput defaultValue="test123" />)
      const input = screen.getByDisplayValue('test123')
      expect(input).toBeInTheDocument()
    })

    it('应该支持受控输入', () => {
      const onChange = vi.fn()
      render(<PasswordInput value="test123" onChange={onChange} />)
      const input = screen.getByDisplayValue('test123')
      expect(input).toBeInTheDocument()
      
      fireEvent.change(input, { target: { value: 'newpassword' } })
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('自定义样式', () => {
    it('应该应用 buttonClassName', () => {
      const { container } = render(
        <PasswordInput buttonClassName="custom-button-class" />
      )
      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-button-class')
    })

    it('应该应用 iconClassName', () => {
      const { container } = render(
        <PasswordInput iconClassName="custom-icon-class" />
      )
      const icon = container.querySelector('svg')
      expect(icon).toHaveClass('custom-icon-class')
    })

    it('应该应用 wrapperClassName', () => {
      const { container } = render(
        <PasswordInput wrapperClassName="custom-wrapper-class" />
      )
      const wrapper = container.firstChild
      expect(wrapper).toHaveClass('custom-wrapper-class')
    })

    it('应该应用 className 到 input', () => {
      const { container } = render(
        <PasswordInput className="custom-input-class" />
      )
      const input = container.querySelector('input')
      expect(input).toHaveClass('custom-input-class')
    })
  })

  describe('禁用状态', () => {
    it('当 disabled 为 true 时输入框应该被禁用', () => {
      const { container } = render(<PasswordInput disabled={true} />)
      const input = container.querySelector('input')
      expect(input).toBeDisabled()
    })
  })

  describe('错误状态', () => {
    it('当有 errorText 时应该显示错误样式', () => {
      const { container } = render(<PasswordInput errorText="错误信息" />)
      const input = container.querySelector('input')
      expect(input).toHaveClass('border-destructive')
    })
  })
})
