
import styled from "styled-components";

const Header = () =>{

    return(
        <Wrapper>
            <img src={require("../media/logo.png")} alt="prout" width={150}/>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    text-align: center;
    width: auto;
`
export default Header;