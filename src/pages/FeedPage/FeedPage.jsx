import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage, goToPostPage } from "../../routes/coordinator";
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  Divider,
  HStack,
  Button,
  Textarea,
  Text,
  Spinner,
  Image,
} from "@chakra-ui/react";

import { useForm } from "../../hooks/useForm";
import { ConfirmandoToken } from "../../components/Token/TokenConfirme";
import {
  GetPost,
  CreatePost,
  CreatePostVote,
  ChangePostVote,
  DeletePostVote,
} from "../../hooks/axios";
import {
  ChatIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import Logo from "../../assets/img/logo.png";
import { GlobalContext } from "../../context";

const FeedPage = () => {
  ConfirmandoToken();

  const { setTextoDoPost, setTitudoDoPost, setUsername } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [todasPostagens, setTodasPostagens] = useState([]);
  const [atualizar, setAtualizar] = useState(false);

  if (paginaAtual < 1) {
    setPaginaAtual(1);
  }

  useEffect(() => {
    const result = GetPost(paginaAtual);

    result.then((response) => {
      setTodasPostagens(response);
    });
  }, [paginaAtual, atualizar]);

  const idPost = (id, tituloPost, textoPost, username) => {
    window.localStorage.removeItem("IdPost");
    window.localStorage.setItem("IdPost", id);
    setTextoDoPost(textoPost);
    setTitudoDoPost(tituloPost);
    setUsername(username);

    goToPostPage(navigate);
  };

  const VotarPost = async (id) => {
    window.localStorage.removeItem("IdPost");
    window.localStorage.setItem("IdPost", id);
    await CreatePostVote();
    setAtualizar(!atualizar);
  };

  const VotarPut = async (id) => {
    window.localStorage.removeItem("IdPost");
    window.localStorage.setItem("IdPost", id);
    await ChangePostVote();
    setAtualizar(!atualizar);
  };

  const TiraVoto = async (id) => {
    window.localStorage.removeItem("IdPost");
    window.localStorage.setItem("IdPost", id);

    await DeletePostVote();
    setAtualizar(!atualizar);
  };

  const SairDaConta = () => {
    window.localStorage.removeItem("token");
    goToLoginPage(navigate);
  };

  const { formValues, onChange, cleanFields } = useForm({
    title: "",
    comentario: "",
  });

  const Postar = async (event) => {
    event.preventDefault();
    await CreatePost(formValues.title, formValues.comentario);
    cleanFields();
    setAtualizar(!atualizar);
  };

  return (
    <Box h="100vh" w="100vw">
      <Center
        bg="#9F9BAF"
        pb="2"
        pt={2}
        boxShadow="0 2px 2px #ccc"
        justifyContent={"space-between"}
      >
        <Image boxSize="40px" src={Logo} alt="logo" marginLeft={10} />

        <Button
          marginRight={5}
          color="#fff"
          background="#4088CB"
          borderRadius={100}
          _hover={{ background: "#022444" }}
          colorScheme="#4088CB"
          variant="ghost"
          onClick={() => SairDaConta()}
        >
          Logout
        </Button>
      </Center>

      <Flex align="center" justify="center">
        <Center
          w="100%"
          height={250}
          bg="white"
          top={100}
          position="absolute"
          p="6"
        >
          <form onSubmit={Postar}>
            <FormControl display="flex" flexDir="column" gap="4">
              <Box w="100%">
                <Input
                  pr="11.5rem"
                  name="title"
                  type="text"
                  value={formValues.title || ""}
                  placeholder="Titlo do post"
                  onChange={onChange}
                />
              </Box>
              <HStack spacing="4">
                <Box w="100%">
                  <Textarea
                    name="comentario"
                    value={formValues.comentario || ""}
                    onChange={onChange}
                    placeholder="Escreva seu Post..."
                  />
                </Box>
              </HStack>
              <HStack spacing="4" justify="center">
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="linear-gradient(90deg, #7F82A4 0%, #564958 100%)"
                  _hover={{
                    bg: "linear-gradient(90deg,  #7f82a4ac 0%, #564958b3   100%)",
                  }}
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  borderRadius={10}
                >
                  Postar
                </Button>
              </HStack>
              <Divider
                orientation="horizontal"
                marginTop="2vw"
                padding={0.499}
                bg="linear-gradient(90deg, #7F82A4 0%, #564958 100%)"
              />
            </FormControl>
          </form>
          <Center w="100%" maxW={840} top={250} position="absolute" p="6">
            <HStack display="flex" flexDir="column" gap="4">
              <Box w="100%">
                <HStack spacing="4" justify="center" marginBottom="8vw">
                  <Box>
                    <Text>
                      <Button onClick={() => setPaginaAtual(paginaAtual - 1)}>
                        {" "}
                        -1{" "}
                      </Button>
                      ⠀⠀{paginaAtual}⠀⠀
                      <Button onClick={() => setPaginaAtual(paginaAtual + 1)}>
                        {" "}
                        +1{" "}
                      </Button>
                    </Text>
                  </Box>
                </HStack>

                {todasPostagens.length > 0 ? (
                  todasPostagens?.map((item) => (
                    <Box
                      marginTop="3vw"
                      bg="#FBFBFB"
                      border="1px solid #E0E0E0"
                      paddingTop="1vw"
                      paddingLeft="2vw"
                      paddingRight="2vw"
                      borderRadius="1vw"
                      h="auto"
                      w={[350, 400, 500]}
                    >
                      <Text>
                        <Text fontSize="xs" color="#585858" marginBottom="10px">
                          {" "}
                          Enviado por: {item.username}
                        </Text>
                        <Text noOfLines="2">
                          Titulo : {item.title}
                          {item.body}
                        </Text>

                        <HStack
                          spacing="20px"
                          justify="end"
                          marginTop={5}
                          marginBottom={5}
                        >
                          <Box>
                            <ChevronUpIcon
                              cursor="pointer"
                              onClick={() => VotarPost(item.id)}
                              color="#47c200"
                              _hover={{ color: "#488624" }}
                              w={10}
                              h={8}
                            />
                            {item.voteSum || 0}
                            <ChevronDownIcon
                              cursor="pointer"
                              onClick={() => VotarPut(item.id)}
                              color="#c70000"
                              _hover={{ color: "#810101" }}
                              w={10}
                              h={8}
                            />
                            <RepeatIcon
                              cursor="pointer"
                              onClick={() => TiraVoto(item.id)}
                              color="#9c9a00"
                              _hover={{ color: "#9c9a10" }}
                              w={8}
                              h={4}
                            />
                          </Box>
                          <Box paddingRight="25px">
                            <Text>
                              <ChatIcon
                                _hover={{ color: "#f59415" }}
                                cursor="pointer"
                                onClick={() =>
                                  idPost(
                                    item.id,
                                    item.title,
                                    item.body,
                                    item.username
                                  )
                                }
                              />{" "}
                              {item.commentCount || 0}{" "}
                            </Text>
                          </Box>
                        </HStack>
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Center w="100%">
                    <Spinner color="#fd7f00" size="xl" />
                  </Center>
                )}

                <HStack spacing="4" justify="center" marginTop="8vw">
                  <Box>
                    <Text>
                      <Button onClick={() => setPaginaAtual(paginaAtual - 1)}>
                        {" "}
                        -1{" "}
                      </Button>
                      ⠀⠀{paginaAtual}⠀⠀
                      <Button
                        onClick={() => {
                          setPaginaAtual(paginaAtual + 1);
                          window.scroll(0, 330);
                        }}
                      >
                        {" "}
                        +1{" "}
                      </Button>
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </HStack>
          </Center>
        </Center>
      </Flex>
    </Box>
  );
};

export default FeedPage;
