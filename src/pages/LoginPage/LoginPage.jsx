import { Pombo } from "../../assets/animation";
import { Login } from "../../components/login";
import { Loading } from "../../hooks/loading";

export const LoginPage = () => {
  return Loading(<Pombo />, <Login />);
};
