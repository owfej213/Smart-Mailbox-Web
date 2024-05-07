import Box from '../ui/Box';
import PropTypes from 'prop-types';

const SideBar = ({ children, ...prop }) => {
    return (
        <Box
            width={[1/2, 1]}
            mx={2}
            flexDirection={"column"}
            { ...prop }
        >
        {children}
        </Box>
    )
}

SideBar.propTypes = {
    children: PropTypes.any
}
export default SideBar;