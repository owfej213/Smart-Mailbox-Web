import { HStack } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function Wrapper({ children }){

    return (
        <HStack
            spacing='16'
            justify='center'
        >
            {children}
        </HStack>
    )
}

Wrapper.propTypes = {
    children: PropTypes.any
}

export default Wrapper;