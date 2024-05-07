import Box from '../ui/Box';
import Title from '../ui/Title';
import PropTypes from 'prop-types';

const Wrapper = ({ title, children, ...props }) => {
    return (
        <Box
            width={"100%"}
            maxWidth={"1000px"}
            mx={"auto"}
            fontWeight={"bold"}
            justifyContent={"center"}
            flexDirection={"column"}
            { ...props }
        >
            <Title
                fontSize={[3, 4, 5, 6]}
                textAlign={"center"}
                color={"primary-text"}
            >
                {title}
            </Title>
            {children}
        </Box>
    )
}

Wrapper.propTypes= {
    title: PropTypes.string,
    children: PropTypes.any
}

export default Wrapper;