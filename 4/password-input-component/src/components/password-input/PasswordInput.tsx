import React, { useState, forwardRef, useCallback, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

export interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  hintText?: string
  floatingLabelText?: string
  disabled?: boolean
  errorText?: string
  fullWidth?: boolean
  buttonDisabled?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void
  buttonClassName?: string
  iconClassName?: string
  wrapperClassName?: string
  labelClassName?: string
  errorClassName?: string
  hintClassName?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      hintText,
      floatingLabelText,
      disabled = false,
      errorText,
      fullWidth = false,
      buttonDisabled = false,
      visible: controlledVisible,
      onVisibleChange,
      buttonClassName,
      iconClassName,
      wrapperClassName,
      labelClassName,
      errorClassName,
      hintClassName,
      value,
      defaultValue,
      onChange,
      className,
      placeholder,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledVisible !== undefined
    const [internalVisible, setInternalVisible] = useState(controlledVisible ?? false)
    const visible = isControlled ? controlledVisible : internalVisible
    const [isFocused, setIsFocused] = useState(false)
    const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '')

    useEffect(() => {
      if (value !== undefined) {
        setInputValue(value)
      }
    }, [value])

    const toggleVisibility = useCallback(() => {
      if (buttonDisabled || disabled) return
      const newVisible = !visible
      if (!isControlled) {
        setInternalVisible(newVisible)
      }
      onVisibleChange?.(newVisible)
    }, [visible, buttonDisabled, disabled, isControlled, onVisibleChange])

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) {
          setInputValue(e.target.value)
        }
        onChange?.(e)
      },
      [onChange, value]
    )

    const hasLabel = !!floatingLabelText
    const hasValue = inputValue !== ''
    const showFloatingLabel = hasLabel && (isFocused || hasValue)

    return (
      <div
        className={cn(
          'relative',
          fullWidth && 'w-full',
          wrapperClassName
        )}
      >
        {hasLabel && (
          <label
            className={cn(
              'absolute left-3 transition-all duration-200 pointer-events-none text-muted-foreground z-10',
              showFloatingLabel
                ? 'text-xs -top-2.5 bg-white px-1 text-primary'
                : 'top-1/2 -translate-y-1/2 text-base md:text-sm',
              errorText && 'text-destructive',
              labelClassName
            )}
          >
            {floatingLabelText}
          </label>
        )}

        <div className="relative">
          <Input
            ref={ref}
            type={visible ? 'text' : 'password'}
            value={value}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            disabled={disabled}
            placeholder={!showFloatingLabel ? placeholder || hintText : undefined}
            className={cn(
              'pr-10',
              errorText && 'border-destructive focus-visible:ring-destructive',
              className
            )}
            onFocus={(e) => {
              setIsFocused(true)
              props.onFocus?.(e)
            }}
            onBlur={(e) => {
              setIsFocused(false)
              props.onBlur?.(e)
            }}
            {...props}
          />

          <button
            type="button"
            onClick={toggleVisibility}
            disabled={buttonDisabled || disabled}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center transition-colors',
              'text-muted-foreground hover:text-foreground',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md',
              (buttonDisabled || disabled) && 'opacity-50 cursor-not-allowed',
              buttonClassName
            )}
            tabIndex={-1}
            aria-label={visible ? '隐藏密码' : '显示密码'}
          >
            {visible ? (
              <EyeOff className={cn('h-4 w-4', iconClassName)} />
            ) : (
              <Eye className={cn('h-4 w-4', iconClassName)} />
            )}
          </button>
        </div>

        {(errorText || hintText) && !floatingLabelText && (
          <p
            className={cn(
              'text-sm mt-1',
              errorText ? 'text-destructive' : 'text-muted-foreground',
              errorText ? errorClassName : hintClassName
            )}
          >
            {errorText || hintText}
          </p>
        )}

        {floatingLabelText && (
          <>
            {errorText && (
              <p
                className={cn('text-sm mt-1 text-destructive', errorClassName)}
              >
                {errorText}
              </p>
            )}
            {!errorText && hintText && (
              <p
                className={cn('text-sm mt-1 text-muted-foreground', hintClassName)}
              >
                {hintText}
              </p>
            )}
          </>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
