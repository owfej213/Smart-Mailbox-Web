import { motion } from "framer-motion";
import Icon from "../../components/ui/Icon";
import Box from "../../components/ui/Box";
import PropTypes from 'prop-types';
import Title from "../../components/ui/Title";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Button from "../../components/ui/Button";

const CardWrapper = styled(Button)`
    text-decoration: none;
    &:hover {
        cursor: pointer;
    }
`

function Card({ userType, iconName, bg }){
    
    function handleClick(){
        sessionStorage.setItem('userType', userType);
        
    }

    return (
        <Link to={'/register/user-options'}>
            <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <CardWrapper to="/register/user-options" 
                    onClick={ handleClick } 
                    bg={"transparent"}
                    flexDirection={"column"}
                    border={0}
                    fontSize={2}
                >
                        <Box
                            bg={bg}
                            width={"210px"}
                            height={"180px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            borderTopLeftRadius={10}
                            borderTopRightRadius={10}
                        >
                            <Icon name={iconName} color="white" size={100}/>
                        </Box>
                        <Box
                            height={"60px"}
                            bg={"white"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            borderBottomLeftRadius={10}
                            borderBottomRightRadius={10}
                            fontWeight={"bold"}
                            color={"secondary-text"}
                        >
                            {userType}
                        </Box>
                </CardWrapper>
            </motion.div>
        </Link>
    )
}

Card.propTypes = {
    userType: PropTypes.string,
    iconName: PropTypes.string,
    bg: PropTypes.string,
}

function UserTypes(){

    return (
        <>
            <Box
                flexDirection={"column"}
                minHeight={"calc(100vh - 400px)"}
                justifyContent={"space-between"}
            >
                <Title
                    my={4}
                    fontSize={[4, 5, 6]}
                    color={"White"}
                    textAlign={"center"}
                >
                    請選擇帳號類型
                </Title>
                <Box
                    mx={"auto"}
                    width={"500px"}
                    justifyContent={"space-between"}
                    
                >
                    <Card userType="住戶" iconName="UserRound" bg="primary" />
                    <Card userType="管理員" iconName="FolderKanban" bg="red" />
                </Box>
            </Box>
        </>
    )
}

export default UserTypes;