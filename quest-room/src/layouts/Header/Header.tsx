import { NavLink } from "react-router-dom"
import { Box, Image, Link, ListItem, Text, List } from "@chakra-ui/react"

const Header = () => {
    const linkStyle = {
    textDecoration: "none",
    color: "#fff",
  };

  const activeStyle = {
    color: "#F2890F", 
    fontWeight: "bold",
  };
  return (
    <Box className="flex items-center justify-between py-5 px-7">
        <Box>
            <Image src='/logo-header.png' alt='Escape Room Logo' />
        </Box>
            <List className="flex items-center gap-12">
                <ListItem> <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>КВЕСТЫ</NavLink></ListItem>
                <ListItem><Link href=''>НОВИЧКАМ</Link></ListItem>
                <ListItem><Link href=''>ОТЗЫВЫ</Link></ListItem>
                <ListItem><Link href=''>АКЦИИ</Link></ListItem>
                <ListItem><NavLink to="/contacts" style={({ isActive }) => (isActive ? activeStyle : linkStyle)}>КОНТАКТЫ</NavLink></ListItem>
            </List>
        <Text className="header-number">8 (800) 333-55-99</Text>
    </Box>
  )
}

export default Header
