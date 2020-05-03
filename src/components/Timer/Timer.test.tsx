import React from 'react'
import { render } from '@testing-library/react'
import Timer from './Timer'

test('renders instructions', () => {
  const { getByText } = render(<Timer />)
  const greeting = getByText(/tap anywhere to/i)
  expect(greeting).toBeInTheDocument()
})
