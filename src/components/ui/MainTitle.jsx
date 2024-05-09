import { Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function MainTitle({ children }){

    return (
        <Heading
            as='h1'
            size='2xl'
            py='8'
            color='white'
            textAlign='center'
        >
            {children}
        </Heading>
    )
}

MainTitle.propTypes = {
    children: PropTypes.any
}

export default MainTitle;