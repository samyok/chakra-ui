import {
  act,
  fireEvent,
  render,
  screen,
  testA11y,
  waitFor,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { Tooltip, TooltipProps } from "."

const buttonLabel = "Hover me"
const tooltipLabel = "tooltip label"

const DummyComponent = (
  props: Omit<TooltipProps & { isButtonDisabled?: boolean }, "children">,
) => {
  const { isButtonDisabled, ...tooltipProps } = props
  return (
    <Tooltip label={tooltipLabel} {...tooltipProps}>
      <button disabled={isButtonDisabled || false}>{buttonLabel}</button>
    </Tooltip>
  )
}

test("passes a11y test when hovered", async () => {
  render(<DummyComponent />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  const tooltip = await screen.findByRole("tooltip")

  await testA11y(tooltip)
})

test("shows on pointerover and closes on pointerleave", async () => {
  render(<DummyComponent />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test("should not show on pointerover if isDisabled is true", async () => {
  vi.useFakeTimers()

  render(<DummyComponent isDisabled />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  vi.useRealTimers()
})

test.skip("should close on pointerleave if openDelay is set", async () => {
  vi.useFakeTimers()

  render(<DummyComponent openDelay={500} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })
  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  act(() => {
    vi.advanceTimersByTime(500)
  })
  expect(screen.queryByText(tooltipLabel)).toBeInTheDocument()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(200)
  })

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )

  vi.useRealTimers()
})

test("should show on pointerover if isDisabled has a falsy value", async () => {
  render(<DummyComponent isDisabled={false} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
})

test.skip("should close on pointerleave if shouldWrapChildren is true and child is a disabled element", async () => {
  render(<DummyComponent shouldWrapChildren isButtonDisabled />)

  fireEvent.pointerEnter(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  const wrapper = screen.getByText(buttonLabel).parentElement
  expect(wrapper).not.toBeNull()

  fireEvent.pointerLeave(wrapper!)

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test.skip("shows on pointerover and closes on pressing 'esc'", async () => {
  const { user } = render(<DummyComponent />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  await user.keyboard("[Escape]")

  await waitFor(() =>
    expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument(),
  )
})

test.skip("shows on pointerover and stays on pressing 'esc' if 'closeOnEsc' is false", async () => {
  const { user } = render(<DummyComponent closeOnEsc={false} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  expect(screen.getByRole("tooltip")).toBeInTheDocument()

  await user.keyboard("[Escape]")

  expect(screen.getByRole("tooltip")).toBeInTheDocument()
})

test("does not show tooltip after delay when `isDisabled` prop changes to `true`", async () => {
  vi.useFakeTimers()

  const { rerender } = render(
    <DummyComponent openDelay={100} isDisabled={false} />,
  )

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  act(() => {
    vi.advanceTimersByTime(50)
  })

  rerender(<DummyComponent openDelay={100} isDisabled={true} />)

  act(() => {
    vi.advanceTimersByTime(100)
  })

  expect(screen.queryByText(tooltipLabel)).not.toBeInTheDocument()

  vi.useRealTimers()
})

test("should call onClose prop on pointerleave", async () => {
  const onClose = vi.fn()

  render(<DummyComponent onClose={onClose} />)

  fireEvent.pointerOver(screen.getByText(buttonLabel))

  await screen.findByRole("tooltip")

  expect(screen.getByRole("tooltip")).toBeInTheDocument()
  expect(onClose).not.toBeCalled()

  fireEvent.pointerLeave(screen.getByText(buttonLabel))

  await waitFor(() => expect(onClose).toBeCalledTimes(1))
})
