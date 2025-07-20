import { Box, Text, Image, Button } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getQuest, type Quest } from "../../api/QuestAPI"

const QuestPage = () => {

    const {id} = useParams()
    const [quest, setQuest] = useState<Quest>()
    const [error, setError] = useState('')

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
                 <Button bgColor='#F28A0F' textColor="#FFFFFF" borderRadius='65px' w='250px' h='65px' fontWeight='800' fontSize='17px' textTransform='uppercase'>Забронировать</Button> 
            </Box>
        </Box>
    )
}

export default QuestPage