import Box from './Box';

function Input({ ...prop}){
    return (
        <Box
            as="input"
            type="text"
            mb={2}
            width={"100%"}
            minHeight={"35px"}
            border={"1px solid"}
            borderColor={"primary-background"}
            borderRadius={5}
            { ...prop }
        />
    )
}

export default Input;