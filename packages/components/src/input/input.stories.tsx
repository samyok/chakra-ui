import { useDisclosure } from "@chakra-ui/hooks"
import * as React from "react"
import { FaCheck, FaPhone } from "react-icons/fa"
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputProps,
  InputRightAddon,
  InputRightElement,
  Stack,
  chakra,
  forwardRef,
} from ".."

export default {
  title: "Components / Forms / Input",
  decorators: [
    (story: Function) => (
      <chakra.div maxW="560px" mx="auto" mt="40px">
        {story()}
      </chakra.div>
    ),
  ],
}

export const Basic = () => <Input placeholder="Basic input" />

export const Controlled = () => {
  const [value, setValue] = React.useState("Starting...")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)

  return (
    <>
      <Input
        value={value}
        onChange={handleChange}
        placeholder="Controlled input"
      />
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  )
}

export const WithSizes = () => (
  <Stack align="start">
    {["xs", "sm", "md", "lg"].map((size) => (
      <Input key={size} size={size} placeholder="This is an input component" />
    ))}
  </Stack>
)

export const WithNativeSize = () => <Input htmlSize={4} width="auto" p="0" />

export const WithStates = () => (
  <Stack align="start">
    <Input placeholder="Idle" />
    <Input isInvalid placeholder="isInvalid" />
    <Input isDisabled placeholder="isDisabled" />
    <Input isReadOnly placeholder="isReadonly" />
  </Stack>
)

export const WithVariants = () => (
  <Stack align="start">
    <Input variant="outline" placeholder="Outline" />
    <Input variant="filled" placeholder="Filled" />
    <Input variant="flushed" placeholder="Flushed" />
    <Input variant="unstyled" placeholder="Unstyled" />
  </Stack>
)

export const WithInputAddon = () => (
  <Stack align="start">
    <InputGroup>
      <InputLeftAddon children="+234" />
      <Input placeholder="Phone number..." />
    </InputGroup>

    <InputGroup size="sm">
      <InputLeftAddon children="https://" />
      <Input placeholder="website.com" />
      <InputRightAddon children=".com" />
    </InputGroup>
  </Stack>
)

export const WithInputAddonResponsive = () => (
  <InputGroup size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}>
    <InputLeftAddon children="https://" />
    <Input placeholder="website.com" />
    <InputRightAddon children=".com" />
  </InputGroup>
)

export const WithInputElement = () => (
  <Stack align="start">
    <InputGroup>
      <InputLeftElement children={<Icon as={FaPhone} color="gray.300" />} />
      <Input paddingStart="60px" type="tel" placeholder="Phone number" />
    </InputGroup>

    <InputGroup size="sm">
      <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
      <Input placeholder="Enter amount" />
      <InputRightElement children={<Icon as={FaCheck} color="green.500" />} />
    </InputGroup>
  </Stack>
)

export const WithInputElementResponsive = () => (
  <InputGroup size={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}>
    <InputLeftElement color="gray.300" fontSize="1.2em" children="$" />
    <Input placeholder="Enter amount" />
    <InputRightElement children={<Icon as={FaCheck} color="green.500" />} />
  </InputGroup>
)

export function PasswordInput() {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        paddingEnd="4.5rem"
        type={show ? "text" : "password"}
        placeholder="Enter password"
      />
      <InputRightElement width="4.5rem">
        <chakra.button onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </chakra.button>
      </InputRightElement>
    </InputGroup>
  )
}

export const WithFocusAndErrorColors = () => (
  <Stack align="start" spacing="10">
    <Input focusBorderColor="lime" placeholder="Here is a sample placeholder" />

    <Input
      focusBorderColor="pink.400"
      placeholder="Here is a sample placeholder"
    />

    <Input
      isInvalid
      errorBorderColor="red.300"
      placeholder="Here is a sample placeholder"
    />

    <Input
      isInvalid
      errorBorderColor="crimson"
      placeholder="Here is a sample placeholder"
    />
  </Stack>
)

function FormError(props: any) {
  return (
    <FormErrorMessage
      mt="0"
      bg="red.500"
      color="white"
      px="1"
      lineHeight="1em"
      borderRadius="sm"
      {...props}
    />
  )
}

export const WithFormControl = () => {
  const [isError, setIsError] = React.useState(false)
  return (
    <Stack align="start">
      <FormControl id="first-name" isInvalid={isError}>
        <chakra.div display="flex" mb="2">
          <FormLabel mb="0" lineHeight="1em">
            Amount
          </FormLabel>
          <FormError>is invalid!</FormError>
        </chakra.div>
        <InputGroup size="sm">
          <InputLeftElement children="$" />
          <Input placeholder="Enter amount" />
          <InputRightAddon children=".com" />
        </InputGroup>
        <FormHelperText>Keep it very short and sweet!</FormHelperText>
      </FormControl>
      <button onClick={() => setIsError((s) => !s)}>Toggle Invalid</button>
    </Stack>
  )
}

export const WithInputElementBug = () => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })
  return (
    <>
      <button onClick={onToggle}>Toggle element</button>
      <InputGroup>
        {isOpen && <InputLeftElement>O</InputLeftElement>}
        <Input name="input" placeholder="placeholder" />
      </InputGroup>
    </>
  )
}

export const InputGroupCustomInputProps = () => {
  return (
    <>
      <InputGroup>
        <CustomInput m="10px" placeholder="should be flushed" />
      </InputGroup>
      <CustomInput m="10px" placeholder="is flushed" />
    </>
  )
}

const CustomInput = forwardRef<InputProps, "input">((props, ref) => (
  <Input ref={ref} color="gray.600" variant="flushed" {...props} />
))
