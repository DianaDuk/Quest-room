import { NavLink } from "react-router-dom"
import { Box, Image, Link, ListItem, Text, List } from "@chakra-ui/react"
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import { useState } from "react";

const Header = () => {
  
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <Box w="134px" className="flex justify-end" onClick={() => setIsModalOpen(true)}>
          <Image src="/person.svg" alt="Person svg" w="24px"/>
        </Box>
        <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </Box>
  )
}

export default Header
