import { Box, Text, Button, Image } from "@chakra-ui/react"
import QuestCard from "../../components/QuestCard/QuestCard"
import { useEffect, useState } from "react"
import { getQuests, type Quest } from "../../api/QuestAPI"

const MainPage = () => {
  const [quests, setQuests] = useState<Quest[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await getQuests()
        setQuests(data)
      } catch(error) {
        setError('Error while fetching quests')
        console.log('Failed to fetch quests:', error)
      }
    }

    fetchQuests()
  }, [])

  return (
    <Box>
      <Box pl="130" pt="3" display="flex" flexDirection="column" gap="8px">
        <Text className="text-[#F2890F]">квесты в Днепре</Text>
        <Text className="text-5xl font-extrabold">Выберите тематику</Text>
    </Box>
    <Box className="flex items-center" gap="40px" pl="130" pt="20">
       <Button leftIcon={<Image src='/all-quests.svg'/>} variant='link'>
        Все квесты
       </Button>
       <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />

       <Button leftIcon={<Image src='/advant.svg'/>} variant='link'>
        Приключения
       </Button>
       <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />

       <Button leftIcon={<Image src='/horrible.svg'/>} variant='link'>
        Ужасы
       </Button>
       <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />

       <Button leftIcon={<Image src='/mistika.svg'/>} variant='link'>
        Мистика
       </Button>
       <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />

       <Button leftIcon={<Image src='/detectiv.svg'/>} variant='link'>
        Детектив
       </Button>
       <Box w="1px" h="40px" className="bg-[#FFFFFF52]" />

       <Button leftIcon={<Image src='/scifi.svg'/>} variant='link'>
       Sci-fi
       </Button>
    </Box>
    <Box pl="130px" py="40px">
     <Box w="1082px" className="flex flex-wrap" gap="25px">
       {quests.map((quest, index) => (
        <QuestCard key={index} title={quest.title} people={quest.players} level={quest.level} img={quest.image}/>
      ))}
     </Box>
      
    </Box>
    </Box>
  )
}

export default MainPage
