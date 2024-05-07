import { motion } from "framer-motion";
import styled from "@emotion/styled";

const LogoMotion = styled.div`
    cursor: pointer;
`

function Logo(){
    return (
        <LogoMotion>
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9}}
            >
            <img src='../../../images/postbox.png' alt="Smart-MailBox" />
            </motion.div>
        </LogoMotion>
    )
}

export default Logo;