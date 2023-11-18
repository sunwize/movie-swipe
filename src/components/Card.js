import styled from "styled-components";



// add the movie description later
const Card = ({movie}) =>{
    const imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    //console.log(movie);
    return(
        <Display>
            <img alt="image poster" src={imgUrl}/>
            
        </Display>
    )
}

const Display = styled.div`
    width: 20rem;
    height: 30rem;
    text-align: center;
    img{
        width: 100%;
        object-fit: cover;
        aspect-ratio: 2/3;
    }

`
export default Card;