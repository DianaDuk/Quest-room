import { Box, Image, Text } from "@chakra-ui/react";

const ContactPage = () => {
     return(
    <Box display="flex" flexDirection="column" alignItems="center" mt='45px' minH='74vh' w='100%'> 
      <Box display="flex" flexDirection="column" gap="8px" maxWidth="1082px" width="100%">
        <Text className="text-[#F2890F]" fontWeight='500' fontSize='14px'>квесты в Днепре</Text>
        <Text fontWeight='800' fontSize='64px' mt='-15px'>Контакты</Text>
      </Box>
      <Box w="1080px" h="0.5px" className= "bg-[#E5E5E5]" border='0.5px' opacity={0.25} mt='20px' />


        <Box mt='40px' display='flex' w='1080px' justifyContent='space-between'>
            <Box display='flex' flexDirection='column' gap='30px' ml='20px'>
                <Box>
                    <Text fontWeight='700' fontSize='14px'>Адрес</Text>
                    <Text fontWeight='300' fontSize='15px'>Днепр,</Text>
                    <Text fontWeight='300' fontSize='15px'>Набережная реки Карповка, д 5П</Text>
                </Box>

                <Box>
                    <Text fontWeight='700' fontSize='14px'>Режим работы</Text>
                    <Text fontWeight='300' fontSize='15px'>Ежедневно, с 9:00 до 20:00</Text>
                </Box>
                

                <Box>
                    <Text fontWeight='700' fontSize='14px'>Телефон</Text>
                    <Text fontWeight='300' fontSize='15px'>8 (800) 333-55-99</Text>
                </Box>

                <Box>
                    <Text fontWeight='700' fontSize='14px'>E-mail</Text>
                    <Text fontWeight='300' fontSize='15px'>info@escape-room.com</Text>
                </Box>
            </Box>

            <Box bgImage='/map.png' w='649px' h='336px'position='relative'>
                <Image src="/geometka.svg" position='absolute' left='51%' top='28%'/>
            </Box>
        </Box>
    </Box>
     )
}

export default ContactPage

