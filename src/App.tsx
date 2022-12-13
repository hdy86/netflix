import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Header from "./Components/Header";
import Movie from "./Routes/Movie";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";

const ResponseOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  z-index: 200;

  @media all and (max-width: 1200px) {
    display: flex;
  }
`;

function App() {
  return (
    <>
      <ResponseOverlay>1200px 의상의 화면으로 봐주세요.</ResponseOverlay>
      <Router>
        <Header />
        <Switch>
          <Route path="/tv">
            <Tv />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path={["/", "/movies/", "/movies/:movieId"]}>
            <Movie />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
