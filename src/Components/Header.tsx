import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: red;
  font-size: 12px;
  font-weight: 500;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled.svg`
  margin-right: 50px;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;
`;

function Header() {
  return (
    <Nav>
      <Col>
        <Logo />
        <Items>
          <Item>Home</Item>
          <Item>Tv Shows</Item>
        </Items>
      </Col>
      <Col>
        <button>search</button>
      </Col>
    </Nav>
  );
}

export default Header;
