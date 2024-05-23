import { Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function SubTitle({ children, size = "3xl", ...prop }){

    return (
        <Heading
            as='h1'
            fontSize={size}
            pb='4'
            color='white'
            textAlign='center'
            { ...prop }
        >
            {children}
        </Heading>
    )
}

SubTitle.propTypes = {
    children: PropTypes.any,
    size: PropTypes.any,
}

export default SubTitle;