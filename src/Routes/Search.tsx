import { useQuery } from "react-query";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, searchMulti } from "../api";
import ImgBox from "../Components/ImgBox";

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
const List = styled.div`
  display: grid;
  row-gap: 40px;
  column-gap: 5px;
  grid-template-columns: repeat(6, 1fr);
`;

const ListNone = styled.div`
  padding: 100px 0;
  font-size: 20px;
  color: #999;
  text-align: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["search", keyword],
    () => searchMulti(keyword)
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Title>
            <b>' {keyword} '</b> 검색 결과
          </Title>
          {data?.results.length !== 0 ? (
            <List>
              <ImgBox keyword={keyword} data={data} />
            </List>
          ) : (
            <ListNone>검색 결과가 없습니다.</ListNone>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Search;
