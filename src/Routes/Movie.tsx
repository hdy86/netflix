import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getNowMovies,
  getPopularMovies,
  getTopMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  NOWPLAYING,
  POPULAR,
  TOPRATED,
  UPCOMING,
} from "../api";
import { makeImagePath } from "../utilities";
import SliderBox from "../Components/SliderBox";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 40px;
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
  min-height: 90vh;
  padding: 0 60px;
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
  font-size: 60px;
`;
const Overview = styled.p`
  width: 50%;
  font-size: 24px;
  padding-bottom: 100px;
`;

const Inner = styled.div`
  padding: 0 40px;
  margin: -200px auto 0;
  box-sizing: border-box;
  overflow: hidden;
`;

function Movie() {
  const { data: popularData, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", POPULAR],
    getPopularMovies
  );
  const { data: nowData } = useQuery<IGetMoviesResult>(
    ["movies", NOWPLAYING],
    getNowMovies
  );
  const { data: topRatedData } = useQuery<IGetMoviesResult>(
    ["movies", TOPRATED],
    getTopMovies
  );
  const { data: upComingData } = useQuery<IGetMoviesResult>(
    ["movies", UPCOMING],
    getUpcomingMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(popularData?.results[0].backdrop_path || "")}
          >
            <Title>{popularData?.results[0].title}</Title>
            <Overview>{popularData?.results[0].overview}</Overview>
          </Banner>
          <Inner>
            <SliderBox
              page="movies"
              title="지금 뜨는 콘텐츠"
              category={POPULAR}
              data={popularData}
            />
            <SliderBox
              page="movies"
              title="현재 상영 중인 콘텐츠"
              category={NOWPLAYING}
              data={nowData}
            />
            <SliderBox
              page="movies"
              title="평점 높은 콘텐츠"
              category={TOPRATED}
              data={topRatedData}
            />
            <SliderBox
              page="movies"
              title="새로 올라온 콘텐츠"
              category={UPCOMING}
              data={upComingData}
            />
          </Inner>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
