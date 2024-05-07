import Box from '../ui/Box';
import Title from '../ui/Title';
import PropTypes from 'prop-types';

const SideBarItem = ({ title, children }) => {
    return (
        <Box
            mb={3}
            p={2}
            fontSize={[0, 1]}
            bg={"secondary-background"}
            borderRadius={4}
            flexDirection={"column"}
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

SideBarItem.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}
export default SideBarItem;