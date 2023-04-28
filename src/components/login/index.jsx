import { useNavigate } from "react-router-dom";
import { goToCadastroPage, goToFeedPage } from "../../routes/coordinator";
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  HStack,
  Button,
  Divider,
  Text,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "../../hooks/useForm";
import { LoginPost } from "../../hooks/axios";
import { LoginToken } from "../../components/Token/Token";
import Logo from "../../assets/img/logo/logo.png";
import { useState } from "react";

export const Login = () => {
  LoginToken();

  const [carregando, setCarregando] = useState(false);

  const navigate = useNavigate();

  const { formValues, onChange } = useForm({
    email: "",
    password: "",
  });

  const FazerLogin = (event) => {
    setCarregando(true);
    event.preventDefault();
    LoginPost(formValues.email, formValues.password, navigate);

    setTimeout(() => {
      setCarregando(false);
    }, 2 * 1000);
  };

  return (
    <Box h="100vh">
      <Flex
        display="flex"
        flexDir="column"
        gap="4"
        align="center"
        justify="center"
      >
        <HStack
          spacing="4"
          justify="center"
          marginTop="5vw"
          display="flex"
          flexDir="column"
        >
          <Box>
            <Center>
              <Image
                boxSize="75px"
                width={150}
                height={150}
                src={Logo}
                alt="Dan Abramov"
              />
            </Center>
          </Box>
          <Box>
            <Center>
              <Text fontWeight={700} fontSize="4xl">
                Pom
              </Text>
            </Center>
          </Box>
          <Box>
            <Center>
              <Text fontWeight={450} fontSize="sm">
                O pombo mais confiavel para mandar mensagens
              </Text>
            </Center>
          </Box>
        </HStack>

        <Center>
          <form onSubmit={FazerLogin}>
            <FormControl display="flex" flexDir="column" gap="4">
              <Box w="100%">
                <Input
                  w={300}
                  name="email"
                  type="email"
                  value={formValues.email || ""}
                  placeholder="E-mail"
                  onChange={onChange}
                />
              </Box>
              <HStack spacing="4">
                <Box w="100%">
                  <Input
                    name="password"
                    type="password"
                    value={formValues.password || ""}
                    placeholder="Senha"
                    onChange={onChange}
                  />
                </Box>
              </HStack>
              <HStack spacing="4" justify="center">
                <Button
                  w={300}
                  p="6"
                  type="submit"
                  bg="linear-gradient(90deg, #7F82A4 0%, #564958 100%)"
                  _hover={{
                    bg: "linear-gradient(90deg,  #7f82a4ac 0%, #564958b3   100%)",
                  }}
                  borderRadius={50}
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  marginTop={10}
                >
                  {carregando ? (
                    <Spinner color="#000000" size="md" />
                  ) : (
                    <h1>Continuar </h1>
                  )}
                </Button>
              </HStack>

              <Divider
                orientation="horizontal"
                marginTop="10px"
                padding={0.499}
                bg="linear-gradient(90deg, #7F82A4 0%, #564958 100%)"
              />
              <Center w="100%" maxW={840} top={220} position="absolute" p="6">
                <Button
                  w={300}
                  minW={300}
                  p="6"
                  type="submit"
                  bg="#ffffff0"
                  color="#7F82A4"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  borderRadius={50}
                  borderColor="#564958"
                  _hover={{ bg: "#2a151b26" }}
                  variant="outline"
                  onClick={() => goToCadastroPage(navigate)}
                >
                  Crie um conta!
                </Button>
              </Center>
            </FormControl>
          </form>
        </Center>
      </Flex>
    </Box>
  );
};
