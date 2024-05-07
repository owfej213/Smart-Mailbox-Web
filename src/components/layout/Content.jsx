import Box from '../ui/Box';
import Title from '../ui/Title';
import PropTypes from 'prop-types';

const Content =({ title, children, ...prop }) => {
    return (
        <Box
            width={[1/2, 1]}
            mx={2}
            py={2}
            fontSize={[0, 1]}
            borderRadius={4}
            flexDirection={"column"}
            { ...prop }
        >
            <Title
                my={2}
                fontSize={[1, 2]}
                textAlign={"center"}
            >
            {title}
            </Title>
    
            {children}
        </Box>
    )
}

Content.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}

export default Content;