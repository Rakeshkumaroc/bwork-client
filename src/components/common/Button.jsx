import { Link } from "react-router-dom";

const Button = ({to, text,color }) => {
  return (
    <Link
      to={to || "#"}
      className={`px-6 py-3  text-white rounded-md shadow-md ${color}`}
    >
      {text}
    </Link>
  );
};

export default Button;
