import { HStack } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function Wrapper({ children }){

    return (
        <HStack
            mx="8"
            pt="12"
            spacing='8'
            justify='center'
            align='flex-start'
        >
            {children}
        </HStack>
    )
}

Wrapper.propTypes = {
    children: PropTypes.any
}

export default Wrapper;