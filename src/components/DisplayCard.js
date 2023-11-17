import styled from "styled-components";
import Card from "./Card";
import { useState } from "react";

const DisplayCard = () =>{
    const [likedMovies, setLikedMovies] = useState([]);

    return(
        <Wrapper>
            {/* send the movie to the card file to be set to display  */}
            <Card/>
            <div className="selectors">
                <div>Yes</div>
                <div>No</div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;
    gap: 1rem;

    .selectors{
        display: flex;
        gap: 1rem;

    }
`
export default DisplayCard;