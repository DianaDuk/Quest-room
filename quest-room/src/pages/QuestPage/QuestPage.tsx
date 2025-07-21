import { Box, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, FormControl, FormLabel, Checkbox, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuest, type Quest } from "../../api/QuestAPI"

const QuestPage = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {id} = useParams()
    const [quest, setQuest] = useState<Quest>()
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        participants: '',
        agree: false
    })

    useEffect(() => {
        const fetchQuests = async () => {
        try {
          if (!id) {
            setError('Quest ID not provided')
          }
          const data = await getQuest(id);
          setQuest(data);
        } catch (error) {
          setError("Error while fetching quests");
          console.log("Failed to fetch quests:", error);
        }
      };
    
      fetchQuests();
    }, [id])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target
      setFormData(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
      }))
    }

    const handlePhoneChange = (value: string) => {
      const digits = value.replace(/\D/g, '')
      setFormData(prev => ({
        ...prev,
        phone: digits.length === 0 ? '' : `+${digits}`
      }))
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Здесь будет логика отправки формы на бекенд
        console.log('Form submitted:', formData)
        onClose()
    }

    return (
        <Box bgImage={quest?.image} className='bg-cover bg-center items-end relative' minH='100vh' w='100%'>
            <Box className="absolute" left='50%' top='50%' transform='translateY(-50%)' maxWidth='520px'>
                <Text className="text-[#F2890F]" fontSize='14px'>{quest?.category}</Text>
                <Text fontWeight='900' fontSize='92px' textTransform='uppercase'>{quest?.title}</Text>    
                <Box className="flex" gap='10px'>
                    <Box className="flex" gap='7px' h='24px'><Image src='/clock.svg'/> <Text>{quest?.duration} мин</Text></Box>
                    <Box w="1px" h="30px" className="bg-[#FFFFFF]" />
                    <Box className="flex" gap='7px' h='24px'><Image src='/person.svg'/> <Text>{quest?.players} чел</Text></Box>
                    <Box w="1px" h="30px" className="bg-[#FFFFFF]" />
                    <Box className="flex" gap='7px' h='24px'><Image src='/puzzle.svg'/> <Text>{quest?.level}</Text></Box>
                </Box>
                 <Text fontWeight='500' fontSize='15px' my='30px'>{quest?.description}</Text>
                 <Button onClick={onOpen} bgColor='#F28A0F' textColor="#FFFFFF" borderRadius='65px' w='250px' h='65px' fontWeight='800' fontSize='17px' textTransform='uppercase'>Забронировать</Button> 
            </Box>

              <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent 
                    bg="#1F1D1D"
                    w="480px"
                    h="656px"
                    borderRadius="none" 
                    maxW="500px" 
                    p="40px" 
                    fontFamily="sans-serif"
                >
                    <ModalHeader 
                        p="0" 
                        mb="30px"
                        fontWeight="800"
                        fontSize="28px" 
                        textColor='#FFFFFF'
                    >
                        Оставить заявку
                    </ModalHeader>
                    <ModalCloseButton 
                        top="40px" 
                        right="20px" 
                        color="#888" 
                        _hover={{ color: "#000" }}
                    />
                    <form onSubmit={handleSubmit}>
                        <ModalBody p="0">
                            <FormControl mb="32px">
                                <FormLabel 
                                    fontSize="15px" 
                                    mb="10px" 
                                    display="block"
                                    textColor='#FFFFFF'
                                >
                                    Ваше Имя
                                </FormLabel>
                                <Input 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleInputChange} 
                                    placeholder="Имя" 
                                    required 
                                    borderRadius="0"
                                    border="1px solid #ddd"
                                    p="15px"
                                    h="auto"
                                    textColor="#FFFFFF"
                                    _focus={{
                                        borderColor: "#F28A0F",
                                        boxShadow: "none"
                                    }}
                                />
                            </FormControl>

                            <FormControl mb="32px">
                                <FormLabel 
                                    fontSize="15px" 
                                    mb="10px" 
                                    display="block"
                                    textColor='#FFFFFF'
                                >
                                    Контактный телефон
                                </FormLabel>
                                <Input 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={e => handlePhoneChange(e.target.value)} 
                                    placeholder="Телефон" 
                                    type="tel"
                                    required 
                                    borderRadius="0"
                                    border="1px solid #ddd"
                                    p="15px"
                                    h="auto"
                                    textColor="#FFFFFF"
                                    _focus={{
                                        borderColor: "#F28A0F",
                                        boxShadow: "none"
                                    }}
                                />
                            </FormControl>

                            <FormControl mb="52px">
                                <FormLabel 
                                    fontSize="15px" 
                                    mb="10px" 
                                    display="block"
                                    textColor='#FFFFFF'
                                >
                                    Количество участников
                                </FormLabel>
                                <Input 
                                    name="participants" 
                                    value={formData.participants} 
                                    onChange={handleInputChange} 
                                    placeholder="Количество участников" 
                                    type="number"
                                    required 
                                    borderRadius="0"
                                    border="1px solid #ddd"
                                    p="15px"
                                    h="auto"
                                    textColor="#FFFFFF"
                                    _focus={{
                                        borderColor: "#F28A0F",
                                        boxShadow: "none"
                                    }}
                                />
                            </FormControl>

                            <ModalFooter p="0" display='flex' justifyContent='center' mb="28px">
                                <Button 
                                  type="submit" 
                                  bgColor="#F28A0F" 
                                  color="white" 
                                  _hover={{ bg: "#e07d0d" }}
                                  maxW="219px"
                                  w="100%"
                                  fontSize="12px"
                                  fontWeight="600"
                                  textTransform="uppercase"
                                  borderRadius="65px"
                                  border="none"
                                >
                                  Отправить заявку
                                </Button>
                            </ModalFooter>

                        <Checkbox 
                                name="agree" 
                                isChecked={formData.agree} 
                                onChange={handleInputChange}
                                required
                                mb="30px"
                                colorScheme="orange"
                                alignItems="flex-start"
                                  sx={{
                                      ".chakra-checkbox__control": {
                                        bg: "#F2890F", 
                                        border: "none", 
                                        borderRadius: "4px",
                                        _checked: {
                                          bg: "#C85C00", 
                                          border: "none",
                                        },
                                        _hover: {
                                          bg: "#a64a00", 
                                          border: "none",
                                        },
                                      },
                                    }}
                            >
                                <Text fontSize="12px" color="#E5E5E5" lineHeight="1.4">
                                    Я согласен с <Box as="span" textDecoration="underline">правилами обработки персональных данных</Box>{" "} и пользовательским соглашением
                                </Text>
                            </Checkbox>
                        </ModalBody>

                    </form>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default QuestPage