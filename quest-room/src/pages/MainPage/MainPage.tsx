import { Box, Text } from "@chakra-ui/react"

const MainPage = () => {
  return (
    <Box pl="130" pt="3" display="flex" flexDirection="column" gap="8px">
        <Text className="text-[#F2890F]">квесты в Днепре</Text>
        <Text className="text-5xl">Выберите тематику</Text>
    </Box>
  )
}

export default MainPage
