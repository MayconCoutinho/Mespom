import { Pombo } from "../../assets/animation";
import { Cadastro } from "../../components/cadastro";
import { Loading } from "../../hooks/loading";

export const CadastroPage = () => {
  return Loading(<Cadastro />, <Pombo />);
};
