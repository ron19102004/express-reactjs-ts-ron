import { Button, Flex, Spacer, ButtonGroup, Box, Heading,MenuDivider, MenuGroup, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from "react-router";

const MenuBar = (): any => {
    let navigate = useNavigate();
    let handleMyAccount = ():void=>{
        navigate('/my-account');
    }
    return (
        <Flex minWidth='max-content' alignItems='center' gap='2' bg='while'>
            <Box py='2' px='5'>
                <Heading size='md'>
                    Home Ron Relax
                </Heading>
            </Box>
            <Spacer/>
            <ButtonGroup px='5' py='2'>
                <Menu>
                    <MenuButton as={Button} colorScheme='green'>
                        Profile
                    </MenuButton>
                    <MenuList>
                        <MenuGroup title='Profile'>
                            <MenuItem onClick={()=>handleMyAccount()}>My Account</MenuItem>
                            <MenuItem>Payments </MenuItem>
                        </MenuGroup>
                        <MenuDivider />
                        <MenuGroup title='Help'>
                            <MenuItem>Docs</MenuItem>
                            <MenuItem>FAQ</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </ButtonGroup>
        </Flex>
    )
}
export default MenuBar;