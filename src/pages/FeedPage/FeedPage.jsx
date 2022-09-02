import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { goToLoginPage, goToPostPage } from '../../routes/coordinator';
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
  Image
} from "@chakra-ui/react";

import { useForm } from '../../hooks/useForm';
import { ConfirmandoToken } from '../../components/Token/TokenConfirme';
import { GetPost, CreatePost, CreatePostVote, ChangePostVote, DeletePostVote } from '../../hooks/axios';
import { ChatIcon, ChevronUpIcon, ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo.png'


const FeedPage = () => {

  ConfirmandoToken()

  const navigate = useNavigate()

  const [paginaAtual, setPaginaAtual] = useState(1)

  if (paginaAtual < 1) {
    setPaginaAtual(1)
  }

  const todasPostagens = GetPost(paginaAtual)


  const idPost = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    goToPostPage(navigate)

  }

  const VotarPost = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    CreatePostVote()

  }

  const VotarPut = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    ChangePostVote()

  }

  const TiraVoto = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    DeletePostVote()


  }

  const SairDaConta = () => {
    window.localStorage.removeItem('token')
    goToLoginPage(navigate)

  }

  const { formValues, onChange, cleanFields } = useForm({
    title: "",
    comentario: "",
  })


  const Postar = (event) => {

    event.preventDefault()
    CreatePost(formValues.title, formValues.comentario)
    cleanFields()
  }

  return (
    <Box>
      <Center
        bg="#EDEDED"
        pb="2"
        boxShadow="0 2px 2px #ccc"
      >
        <Image paddingTop={1.5} marginLeft={20} boxSize='40px' src={Logo} alt='Dan Abramov' />
        <Button
          left={55}
          color='#4088CB'
          colorScheme='#4088CB'
          _hover={{ color: "#022444" }}
          variant='ghost'
          onClick={() => SairDaConta()}
        > Logout </Button>

      </Center>

      <Flex
        align="center"
        justify="center"
      >
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
                  pr='11.5rem'
                  name='title'
                  type='text'
                  value={formValues.title || ''}
                  placeholder="Titlo do post"
                  onChange={onChange} />
              </Box>
              <HStack spacing="4">
                <Box w="100%">
                  <Textarea
                    name='comentario'
                    value={formValues.comentario || ''}
                    onChange={onChange}
                    placeholder='Escreva seu Post...'
                  />
                </Box>
              </HStack>
              <HStack spacing="4" justify="center">
                <Button
                  w={240}
                  p="6"
                  type="submit"
                  bg="linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"
                  _hover={{ bg: 'linear-gradient(90deg, #fd446fd2 0%, #f8a633c0 100%)' }}

                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  borderRadius={10}
                >
                  Postar
                </Button>
              </HStack>
              <Divider orientation='horizontal' marginTop='2vw' padding={.499} bg='linear-gradient(90deg, #ff003c 0%, #ff9500 100%)' />
            </FormControl>
          </form>
          <Center
            w="100%"
            maxW={840}
            top={250}
            position="absolute"
            p="6"
          >
            <HStack display="flex" flexDir="column" gap="4">
              <Box w="100%">

                <HStack spacing="4" justify="center" marginBottom='8vw'>
                  <Box>
                    <Text>
                      <Button onClick={() => setPaginaAtual(paginaAtual - 1)}> -1 </Button>
                      ⠀⠀{paginaAtual}⠀⠀
                      <Button onClick={() => setPaginaAtual(paginaAtual + 1)} > +1 </Button>
                    </Text>
                  </Box>
                </HStack>

                {todasPostagens.length > 0 ? (todasPostagens && todasPostagens?.map((item) =>

                  <>

                    <Text
                      marginTop='3vw'
                      bg='#FBFBFB'
                      border='1px solid #E0E0E0'
                      paddingTop='1vw'
                      paddingLeft='2vw'
                      borderRadius='1vw'
                      minHeight='20vw'
                      minWidth='40vw'
                      maxWidth='90vw'
                      maxHeight='35vw'
                    >
                      <Text
                        fontSize='xs'
                        color='#585858'
                        marginBottom='3vw'

                      > Enviado por: {item.username} </Text>
                      <Text noOfLines='2'> Titulo : {item.title}
                        {item.body}</Text>

                      <HStack justify="center" paddingTop='5vw'>
                        <Box marginLeft='30vw' >
                          <ChevronUpIcon
                            cursor='pointer'
                            onClick={() => VotarPost(item.id)}
                            color='#47c200'
                            _hover={{ color: "#488624" }}
                            w={10} h={8} />
                          {item.voteSum || 0}
                          <ChevronDownIcon
                            cursor='pointer'
                            onClick={() => VotarPut(item.id)}
                            color='#c70000'
                            _hover={{ color: "#810101" }}
                            w={10} h={8} />
                          <RepeatIcon
                            cursor='pointer'
                            onClick={() => TiraVoto(item.id)}
                            color='#9c9a00'
                            _hover={{ color: "#9c9a10" }}
                            w={8} h={4} />
                        </Box>
                        <Box paddingRight='10vw'>
                          <Text><ChatIcon
                            _hover={{ color: "#f59415" }}
                            cursor='pointer'
                            onClick={() => idPost(item.id)} /> {item.commentCount || 0} </Text>

                        </Box>
                      </HStack>
                    </Text>
                  </>
                )) : (

                  <Center
                    w="100%"
                  >
                    <Spinner color='#fd7f00' size='xl' />
                  </Center>
                )}

                <HStack spacing="4" justify="center" marginTop='8vw'>
                  <Box>
                    <Text>
                      <Button onClick={() => setPaginaAtual(
                        paginaAtual - 1
                      )}> -1 </Button>
                      ⠀⠀{paginaAtual}⠀⠀
                      <Button onClick={() => {


                        setPaginaAtual(paginaAtual + 1)
                        window.scroll(0, 330)

                      }} > +1 </Button>
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
}


export default FeedPage;