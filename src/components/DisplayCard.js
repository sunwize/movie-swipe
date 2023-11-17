import styled from "styled-components";
import Card from "./Card";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getPopularMovies } from "../services/api";

const DisplayCard = () =>{
    const [likedMovies, setLikedMovies] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    console.log(likedMovies);
    useEffect(() => {
        getPopularMovies()
            .then(data => {
                setMovies(data);
            });
    },[]);

    return movies.length > 0 ? (
        <Wrapper>
            {/* send the movie to the card file to set to display  */}
            <Card movie={movies[currentIndex]}/>
            <div className="selectors">
                <button className="choice"
                    id="yes" 
                    onClick={() => {
                        setLikedMovies((arr) => [...arr, movies[currentIndex]])
                        setCurrentIndex((index) => index >= movies.length - 1 ? 0 : index + 1)}}> 
                    Yes 
                </button>
                <button className="choice"
                    id="no" 
                    onClick={() => {
                        setCurrentIndex((index) => index >= movies.length - 1 ? 0 : index + 1)}}> 
                    No 
                </button>        
                
            </div>
        </Wrapper>
    ):(
        <Loading/>
    );
}

const Wrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: auto;

    .selectors{
        display: flex;
        gap: 3rem;
        height: auto;
    }
    .choice{
        font-size: var(--subheader-font-size);
    }
`
export default DisplayCard;