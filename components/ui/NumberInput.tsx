'use client' // Required for client-side interactivity

import { Input } from '@/components/ui/input'
import React, { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

const NumberInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      let value = target.value

      // Remove leading zeros
      if (/^0+/.test(value)) {
        value = value.replace(/^0+/, '')
      }

      // Ensure the value is greater than 0
      if (Number(value) <= 0) {
        value = ''
      }

      // Update the input value
      target.value = value
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent non-numeric characters
      if (
        event.key === 'e' ||
        event.key === 'E' ||
        event.key === '+' ||
        event.key === '-'
      ) {
        event.preventDefault()
      }
    }

    const input = inputRef.current
    if (input) {
      input.addEventListener('input', handleInput)
      input.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      if (input) {
        input.removeEventListener('input', handleInput)
        input.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  return (
    <Input
      type='number'
      ref={inputRef}
      className={twMerge(
        className,
        '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      )}
      {...props} // Spread all additional props onto the Input component
    />
  )
})

export default NumberInput
