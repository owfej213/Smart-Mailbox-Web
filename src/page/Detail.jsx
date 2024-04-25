import { Title, Wrapper } from '../components/CommonStyles';
import { useParams } from 'react-router-dom';
function Detail() {
    const { id } = useParams();
    return (
        <>
            <Wrapper>
            <Title fontSize={[3, 4, 5, 6]}>管理介面</Title>
            <p>{id}</p>
            </Wrapper>
        </>
    );
}

export default Detail;
