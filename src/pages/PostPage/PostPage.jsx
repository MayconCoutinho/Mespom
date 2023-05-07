import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToFeedPage } from "../../routes/coordinator";
import {
  Flex,
  Box,
  Center,
  FormControl,
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
  GetPostComments,
  CreateComment,
  CreateCommentVote,
  ChangeCommentVote,
} from "../../hooks/axios";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
} from "@chakra-ui/icons";
import Logo from "../../assets/img/logo.png";
import { GlobalContext } from "../../context";

const PostPage = () => {
  ConfirmandoToken();
  const { textoDoPost, titudoDoPost, username } = useContext(GlobalContext);
  const [allPosts, setAllPosts] = useState(null);
  const [atualizar, setAtualizar] = useState(false);

  const navigate = useNavigate();

  const { formValues, onChange, cleanFields } = useForm({
    comentario: "",
  });

  useEffect(() => {
    const result = GetPostComments();

    result.then((response) => {
      setAllPosts(response);
    });
  }, [atualizar]);

  const SairDaConta = () => {
    window.localStorage.removeItem("token");
  };

  const VotarComentarios = async (id) => {
    await CreateCommentVote(id);
    setAtualizar(!atualizar);
  };

  const ComentariosPut = async (id) => {
    await ChangeCommentVote(id);
    setAtualizar(!atualizar);
  };

  const comentar = async (event) => {
    event.preventDefault();
    await CreateComment(formValues);
    cleanFields();
    setAtualizar(!atualizar);
  };

  return (
    <Box>
      <Center
        bg="#EDEDED"
        pb={2}
        pt={2}
        boxShadow="0 2px 2px #ccc"
        justifyContent={"space-between"}
      >
        <ArrowLeftIcon
          marginLeft={5}
          color="#022444"
          onClick={() => goToFeedPage(navigate)}
          size="lg"
          _hover={{ color: "#4088CB" }}
        />
        <Image
          onClick={() => goToFeedPage(navigate)}
          cursor="pointer"
          boxSize="40px"
          src={Logo}
          alt="logo"
        />

        <Button
          marginRight={5}
          color="#4088CB"
          colorScheme="#4088CB"
          variant="ghost"
          _hover={{ color: "#022444" }}
          onClick={() => {
            SairDaConta();
            goToFeedPage(navigate);
          }}
        >
          {" "}
          Logout{" "}
        </Button>
      </Center>

      <Flex flexDirection={"column"} align="center" justify="center">
        <Box
          marginTop="30px"
          bg="#FBFBFB"
          border="1px solid #E0E0E0"
          paddingTop="1vw"
          paddingBottom={"4vw"}
          paddingLeft="2vw"
          paddingRight="2vw"
          borderRadius="1vw"
          h="auto"
          w={[350, 400, 500]}
        >
          <Text fontSize="xs" color="#585858" marginBottom="10px">
            Enviado por: {username}
          </Text>
          <Text>
            Titulo : {titudoDoPost}
            {textoDoPost}
          </Text>
        </Box>
        <Center top={100} p="2">
          <form onSubmit={comentar}>
            <FormControl spacing="4" padding={2}>
              <HStack>
                <Box w="100%">
                  <Textarea
                    pr="10.5rem"
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
                    bg: "linear-gradient(90deg,#7f82a4ac 0%, #564958b3   100%)",
                  }}
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="8"
                  borderRadius={10}
                >
                  Responder
                </Button>
              </HStack>
              <Divider
                orientation="horizontal"
                marginTop="8"
                padding={0.499}
                bg="linear-gradient(90deg,#7F82A4 0%, #564958 100%)"
              />
            </FormControl>
          </form>
        </Center>

        {allPosts === null ? (
          <Spinner color="#fd7f00" size="xl" marginTop={10} />
        ) : allPosts.length > 0 ? (
          allPosts.map((item) => {
            return (
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
                    Enviado por: {item.username}{" "}
                  </Text>
                  {console.log(item)}
                  {item.body}
                  <HStack
                    spacing="20px"
                    justify="end"
                    marginTop={5}
                    marginBottom={5}
                  >
                    <Box>
                      <ChevronUpIcon
                        cursor="pointer"
                        onClick={() => VotarComentarios(item.postId)}
                        color="#47c200"
                        _hover={{ color: "#488624" }}
                        w={8}
                        h={8}
                      />
                      {item.voteSum || 0}
                      <ChevronDownIcon
                        cursor="pointer"
                        onClick={() => ComentariosPut(item.postId)}
                        color="#c70000"
                        _hover={{ color: "#810101" }}
                        w={8}
                        h={8}
                      />
                    </Box>
                  </HStack>
                </Text>
              </Box>
            );
          })
        ) : (
          <h1> Sem postes </h1>
        )}
      </Flex>
    </Box>
  );
};

export default PostPage;
