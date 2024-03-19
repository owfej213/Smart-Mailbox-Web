import LogoutButton from '../components/Logout';
import { Button } from 'react-aria-components';

function Home() {


    return (
      <>
        <LogoutButton />
        <Button onPress={() => alert('Hello world!')}>Press me</Button>
      </>
    )
  }
  
  export default Home
  