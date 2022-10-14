import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utilities";

const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0.8)
    ),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 30px;
`;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
