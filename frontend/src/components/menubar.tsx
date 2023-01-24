import { Menu, MenuDivider, MenuGroup, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';

const MenuBar: React.FC = (): any => {
    const navigate = useNavigate();
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Ron's Home Relax</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/products">Product</Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Menu>
                            <MenuButton as={Button} leftIcon={<UserOutlined />} colorScheme='pink'>
                                Profile
                            </MenuButton>
                            <MenuList>
                                <MenuGroup title='Profile'>
                                    <MenuItem as={Button}
                                              onClick={(e) =>{
                                                  navigate('/profile')
                                              }}
                                    >My Account</MenuItem>
                                    <MenuItem>Payments </MenuItem>
                                </MenuGroup>
                                <MenuDivider />
                                <MenuGroup title='Help'>
                                    <MenuItem as="a" href="https://www.facebook.com/ron292004"
                                    >Facebook</MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
export default MenuBar;