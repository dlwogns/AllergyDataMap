import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import styled from "styled-components";

const Box = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid black;
`;

const App = () => {
  const routing = useRoutes(Themeroutes);

  return <div className="dark">{routing}</div>;
};

export default App;
