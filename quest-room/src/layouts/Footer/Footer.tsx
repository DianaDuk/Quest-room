import { Box, Image } from "@chakra-ui/react"


const Footer = () => {
  return (
    <Box className="flex items-start" pl="20px" pb="20px" gap="5px">
      <Image src="/skype.svg" />
      <Image src="/vk.svg" />
    </Box>
  )
}

export default Footer
