import { Link } from "react-router-dom";

const ButtonOutLine = ({ to, text, style }) => {
  return (
    <Link
      to={to || "#"}
      className={`px-6 py-3 border  text-black rounded-md ${style}`}
    >
      {text}
    </Link>
  );
};

export default ButtonOutLine;
