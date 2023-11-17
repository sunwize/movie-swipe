import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Header from "./components/Header";
import Invite from "./components/Invite";
import DisplayCard from "./components/DisplayCard";

function App() {
  return (
    <Page>
      <GlobalStyles/>
      <Header/>
      <Invite/>
      <DisplayCard/>
    </Page>
    
  );
}

const Page = styled.div`
font-family: var(--primary-font-family);
  h1{
    font-size: var(--header-font-size);
  }
  h3{
    font-size: var(--subheader-font-size);
  }
  p{
    font-size: var(--paragraph-font-size);
  }

`


export default App;
