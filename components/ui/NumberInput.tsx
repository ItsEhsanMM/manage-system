'use client' // Required for client-side interactivity

import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

// Define the props interface, extending the input props but overriding onChange
interface NumberInputProps
  extends Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> {
  onChange?: (value: number) => void // Custom onChange that returns a number
  value?: number // Controlled value prop
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, onChange, value, ...props }, ref) => {
    // State to manage the input value
    const [inputValue, setInputValue] = useState<string>(
      value != null ? value.toString() : '' // Safely handle undefined or null
    )

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value

      // Remove leading zeros and ensure value is a valid string
      const sanitizedValue = value.replace(/^0+/, '') || '0'

      // Convert the sanitized value to a number
      const numericValue = sanitizedValue ? parseFloat(sanitizedValue) : 0

      // Update the input value state
      setInputValue(sanitizedValue)

      // Call the parent's onChange with the numeric value, if available
      if (onChange) {
        onChange(numericValue)
      }
    }

    return (
      <Input
        type='text' // Changed type to text to avoid forcing number input limitations (e.g., no decimals)
        ref={ref} // Forward the ref to the Input component
        value={inputValue} // Controlled value
        className={twMerge(
          className,
          '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
        )}
        onChange={handleChange} // Use the custom handleChange
        {...props} // Spread all additional props onto the Input component
      />
    )
  }
)

// Set a display name for the component (useful for debugging)
NumberInput.displayName = 'NumberInput'

export default NumberInput
