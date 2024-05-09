import { Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';

function SubTitle({ children, ...prop }){

    return (
        <Heading
            as='h1'
            size='md'
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
    children: PropTypes.any
}

export default SubTitle;