import { useNavigate } from "react-router-dom"
import { Box, Image, Link, ListItem, Text, List } from "@chakra-ui/react"

const Header = () => {
    const navigate = useNavigate()
  return (
    <Box className="flex items-center justify-between py-5 px-7">
        <Box>
            <Image src='/logo-header.png' alt='Escape Room Logo' />
        </Box>
            <List className="flex items-center gap-12">
                <ListItem onClick={() => navigate('/quests')} className="text-[#F2890F]">КВЕСТЫ</ListItem>
                <ListItem><Link href=''>НОВИЧКАМ</Link></ListItem>
                <ListItem><Link href=''>ОТЗЫВЫ</Link></ListItem>
                <ListItem><Link href=''>АКЦИИ</Link></ListItem>
                <ListItem cursor='pointer' onClick={() => navigate('/contacts')}>КОНТАКТЫ</ListItem>
            </List>
        <Text className="header-number">8 (800) 333-55-99</Text>
    </Box>
  )
}

export default Header
