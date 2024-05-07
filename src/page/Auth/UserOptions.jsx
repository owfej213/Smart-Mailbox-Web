import Box from "../../components/ui/Box";
import PropTypes from 'prop-types';
import Title from "../../components/ui/Title";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { auth, db } from "../../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function InputBox({ label, children }){
    return (
        <>
            <Box
                as="label"
                mb={2}
                fontSize={2}
                fontWeight={"bold"}
                color={"primary-text"}
                alignItems={"center"}
            >
                {label}：
            </Box>
            {children}
        </>
    )
}

InputBox.propTypes = {
    children: PropTypes.any,
    label: PropTypes.string
}

function UserOptions(){
    const [ user ] = useAuthState(auth);
    const [ formSubmitted, setFormSubmitted ] = useState(false);
    const [ userNickName, setUserNickName ] = useState('');
    const [ userRealName, setUserRealName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ mailID, setMailID ] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();

        const userType = sessionStorage.getItem('userType');
        const userDoc = doc(db, `users/${user.uid}`);
        
        setDoc(userDoc, {
            userNickName: userNickName,
            userRealName: userRealName,
            userType: userType,
            email: user.email,
            address: address,
            mailID: mailID,
        })
        setFormSubmitted(true)
    }

    return (
        <>
            {!user && (<Navigate to={'/Login'} replace={true} />)}
            {formSubmitted && (<Navigate to={'/home'} replace={true} />)}
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
                    請輸入基本資料
                </Title>
                <Box
                    borderColor={"secondary-background-light"}
                    borderWidth={"2px"}
                    borderStyle={"solid"}
                    borderRadius={5}
                    mx={"auto"}
                    maxWidth={"500px"}
                    width={"100%"}
                >
                    <Box 
                        as="form"
                        mx={"auto"}
                        p={4}
                        onSubmit={onSubmit}
                        maxWidth={"350px"}
                        width={"100%"}
                        flexDirection={"column"}
                    >
                        <InputBox label="暱稱">
                            <Input
                                maxlength={20}
                                onChange={(e) => { setUserNickName(e.target.value) }}
                            />
                        </InputBox>
                        <InputBox label="真實姓名">
                            <Input
                                maxlength={20}
                                onChange={(e) => { setUserRealName(e.target.value) }}
                                required
                            />
                        </InputBox>
                        <InputBox label="地址">
                            <Input 
                                onChange={(e) => { setAddress(e.target.value) }}
                                required
                            />
                        </InputBox>
                        <InputBox label="郵箱ID">
                            <Input
                                onChange={(e) => { setMailID(e.target.value) }}
                                required
                            />
                        </InputBox>
                        <Button
                            type="submit"
                            mx={"auto"}
                            mt={3}
                            bg={"primary"}
                            color={"white"}
                            fontSize={1}
                            borderRadius={"8px"}
                            maxWidth={"80px"}
                            width={"100%"}
                            minHeight={"40px"}
                            variant={"primary"}
                        >
                            繼續
                        </Button>
                    </Box>
                </Box>
            </Box>
            
        </>
    )
}

export default UserOptions;