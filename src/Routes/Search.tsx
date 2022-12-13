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
          <List>
            <ImgBox keyword={keyword} data={data} />
          </List>
        </>
      )}
    </Wrapper>
  );
}

export default Search;
