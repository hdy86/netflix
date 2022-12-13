import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { makeImagePath } from "../utilities";

const Container = styled.div`
  padding-bottom: 30px;
`;
const Box = styled(motion.div)`
  border-radius: 5px;
  font-size: 66px;
  overflow: hidden;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Thumnail = styled.div<{ bgPhoto: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;
const Info = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 100;
`;
const BigMovie = styled(motion.div)`
  position: fixed;
  width: 90vw;
  max-width: 800px;
  height: 70vh;
  top: 15vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  overflow-y: hidden;
  z-index: 120;
`;
const BigImgBox = styled.div`
  position: relative;
`;
const BigCloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #eee;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;
const BigCover = styled.div`
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
`;
const BigTitle = styled.h3`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 36px;
  color: ${(props) => props.theme.white.lighter};
  font-weight: bold;
`;
const BigText = styled.div`
  padding: 20px;
`;
const BigDesc = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  p {
    font-size: 16px;
    color: #aaa;
  }
  i {
    display: block;
    width: 2px;
    height: 14px;
    margin: 0 15px;
    background: #666;
  }
`;
const BigOverview = styled.p`
  font-size: 18px;
  color: ${(props) => props.theme.white.lighter};
  line-height: 1.5;
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    // y: -50,
    scale: 1.3,
    transition: {
      type: "tween",
      delay: 0.5,
      duaration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      type: "tween",
      delay: 0.5,
      duaration: 0.3,
    },
  },
};

interface ISliderProps {
  keyword: string | null;
  data: IGetMoviesResult | undefined;
}

const offset = 6; // 한 페이지에 보여지는 영화 갯수
const NEXFLIX_LOGO_URL =
  "https://assets.brand.microsites.netflix.io/assets/2800a67c-4252-11ec-a9ce-066b49664af6_cm_800w.jpg?v=4";

function SliderBox({ keyword, data }: ISliderProps) {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    `/search/search/:movieId`
  );
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/search/search/${movieId}?keyword=${keyword}`);
  };
  const onOverlayClick = () => history.push(`/search?keyword=${keyword}`);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);

  return (
    <>
      <>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          {data?.results.map((movie) => (
            <Box
              layoutId={movie.id + ""}
              key={movie.id}
              variants={boxVariants}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween" }}
              onClick={() => onBoxClicked(movie.id)}
            >
              <Thumnail
                bgPhoto={
                  movie.backdrop_path
                    ? makeImagePath(movie.backdrop_path, "w500")
                    : NEXFLIX_LOGO_URL
                }
              />
              <Info variants={infoVariants}>
                <h4>{movie.title}</h4>
              </Info>
            </Box>
          ))}
        </AnimatePresence>
      </>

      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <BigMovie layoutId={bigMovieMatch.params.movieId}>
              {clickedMovie && (
                <>
                  <BigImgBox>
                    <BigCloseBtn onClick={onOverlayClick}>X</BigCloseBtn>
                    <BigCover
                      style={{
                        backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                          clickedMovie.backdrop_path,
                          "w500"
                        )})`,
                      }}
                    />
                    <BigTitle>
                      {(clickedMovie.title && clickedMovie.title) ||
                        (clickedMovie.name && clickedMovie.name)}
                    </BigTitle>
                  </BigImgBox>
                  <BigText>
                    <BigDesc>
                      <p>⭐ {clickedMovie.vote_average}</p>
                      <i></i>
                      <p>
                        {(clickedMovie.release_date &&
                          clickedMovie.release_date) ||
                          (clickedMovie.first_air_date &&
                            clickedMovie.first_air_date)}
                      </p>
                    </BigDesc>
                    <BigOverview>{clickedMovie.overview}</BigOverview>
                  </BigText>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default SliderBox;
