import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, searchMovies, searchTv } from "../api";
import ImgBox from "../Components/ImgBox";
import SliderBox from "../Components/SliderBox";

const Wrapper = styled.div`
  padding: 100px 40px;
  box-sizing: border-box;
  overflow: hidden;
`;
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 60px;
  font-size: 36px;
  text-align: center;

  b {
    font-weight: bold;
  }
`;
const SubTitle = styled.h5`
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
`;
const Inner = styled.div`
  padding: 0 40px;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
`;
// const List = styled.div`
//   display: grid;
//   row-gap: 40px;
//   column-gap: 5px;
//   grid-template-columns: repeat(6, 1fr);
// `;
const ListNone = styled.div`
  padding: 100px 0;
  font-size: 20px;
  color: #999;
  text-align: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data: searchMovieData, isLoading } = useQuery<IGetMoviesResult>(
    ["searchMovie", keyword],
    () => searchMovies(keyword)
  );
  const { data: searchTvData } = useQuery<IGetMoviesResult>(
    ["searchTv", keyword],
    () => searchTv(keyword)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>
            <b>'{keyword}'</b> 검색 결과
          </Title>
          <Inner>
            {searchMovieData?.results.length !== 0 ? (
              <SliderBox
                page="search"
                title="영화 검색 결과"
                category={"searchMovie"}
                data={searchMovieData}
              />
            ) : (
              <>
                <SubTitle>영화 검색 결과</SubTitle>
                <ListNone>검색 결과가 없습니다.</ListNone>
              </>
            )}
            {searchTvData?.results.length !== 0 ? (
              <SliderBox
                page="search"
                title="TV 프로그램 검색 결과"
                category={"searchTv"}
                data={searchTvData}
              />
            ) : (
              <>
                <SubTitle>TV 프로그램 검색 결과</SubTitle>
                <ListNone>검색 결과가 없습니다.</ListNone>
              </>
            )}
          </Inner>
          {/* {data?.results.length !== 0 ? (
            <List>
              <ImgBox keyword={keyword} data={data} />
            </List>
          ) : (
            <ListNone>검색 결과가 없습니다.</ListNone>
          )} */}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
