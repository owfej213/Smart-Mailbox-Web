import { Flex } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function Container({ children, ...props }){

    return (
        <Flex
            justify='center'
            p='4'
            w='100%'
            bg='gray.400'
            borderRadius='12px'
            boxShadow='lg'
            direction='column'
            { ...props }
        >
            {children}
        </Flex>
    )
}

Container.propTypes = {
    children: PropTypes.any
}

export default Container;