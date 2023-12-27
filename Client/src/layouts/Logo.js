import { ReactComponent as LogoDark } from "../assets/images/logos/amplelogo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/totaldatapage"
      style={{
        textDecorationLine: "none",
        fontFamily: "cursive",
        fontSize: "20px",
      }}
    >
      <div>AllergyMapData</div>
    </Link>
    // <Link to="/">
    //   <LogoDark />
    // </Link>
  );
};

export default Logo;
