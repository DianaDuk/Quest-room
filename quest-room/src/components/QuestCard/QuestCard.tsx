import { Box, Text, Image } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

interface QuestCardProps {
    id: number
    title: string
    people: string
    level: string
    img: string
}

const QuestCard = ({
    id,
    title,
    people,
    level,
    img
}: QuestCardProps) => {
  const navigate = useNavigate()
  return (
    <Box bgGradient={img} className='bg-cover bg-center flex items-end relative' w="344px" h="232px" p="15px" borderRadius="3px" cursor='pointer' onClick={() => navigate(`/quests/${id}`)}>
      <Box>
        <Text className='font-bold text-2xl'>{title}</Text>
        <Box className='flex' gap="10px" mt="10px" >
            <Box className='flex' gap="7px"><Image src='/person.svg'/> <Text>{people} чел</Text></Box>
             <Box w="1px" h="20px" className="bg-[#FFFFFF]" />
            <Box className='flex' gap="7px"><Image src='/puzzle.svg'/> <Text>{level}</Text></Box>
        </Box>
      </Box>
    </Box>
  )
}

export default QuestCard
