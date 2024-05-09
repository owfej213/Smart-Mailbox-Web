import { Box, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";


function Logo(){
    return (
        <Box
            w='3%'
            h='3%'
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9}}
            >
                <Image
                    src='../../../images/postbox.png'
                    alt="iMailBox"
                />
            </motion.div>
        </Box>
    )
}

export default Logo;