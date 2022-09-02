import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToFeedPage } from '../../routes/coordinator';
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
  CloseButton,
  Spinner, 
  Image
} from "@chakra-ui/react";
import { useForm } from '../../hooks/useForm';
import { ConfirmandoToken } from '../../components/Token/TokenConfirme';
import { GetPostComments, CreateComment, CreateCommentVote, ChangeCommentVote } from '../../hooks/axios';
import { ChevronUpIcon, ChevronDownIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import Logo from '../../assets/logo.png'

const PostPage = () => {

  ConfirmandoToken()

  const todasPostagens = GetPostComments()

  const SairDaConta = () => {
    window.localStorage.removeItem('token')

  }

  const VotarComentarios = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    CreateCommentVote()
  }

  const ComentariosPut = (id) => {

    window.localStorage.removeItem('IdPost')
    window.localStorage.setItem("IdPost", id)
    ChangeCommentVote()

  }


  const navigate = useNavigate()


  const { formValues, onChange, cleanFields } = useForm({
    comentario: "",
  })


  const comentar = (event) => {

    event.preventDefault()
    CreateComment(formValues)
    cleanFields()
  }

  return (
    <Box>


      <Center
        bg="#EDEDED"
        pb="2"
        boxShadow="0 2px 2px #ccc"
      >
        <Center >
          <Image 
          onClick={() => goToFeedPage(navigate)} 
          cursor='pointer'  
          paddingTop={1.5} marginLeft={20} 
          boxSize='40px' 
          src={Logo} alt='Dan Abramov' />
          

          <Button
            left={55}
            color='#4088CB'
            colorScheme='#4088CB'
            variant='ghost'
            _hover={{ color: "#022444" }}

            onClick={() => SairDaConta()}
            
          > Logout </Button>

        </Center>
        <ArrowLeftIcon
          position='absolute'
          left='8'
          color='#022444'
          onClick={() => goToFeedPage(navigate)}
          size='lg'
          _hover={{ color: "#4088CB" }}
        />

      </Center>

      <Flex
        align="center"
        justify="center"
      >
        <Center
          w="100%"
          height={300}
          bg="white"
          top={100}
          position="absolute"
          p="6"
        >
          <form onSubmit={comentar}>
            <FormControl display="flex" flexDir="column" gap="4">
              <HStack spacing="4">
                <Box w="100%">
                  <Textarea
                    pr='10.5rem'

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
                  Responder
                </Button>
              </HStack>
              <Divider orientation='horizontal' marginTop='2vw' padding={.499} bg='linear-gradient(90deg, #ff003c 0%, #ff9500 100%)' />
            </FormControl>
          </form>
          <Center
            w="100%"
            maxW={840}
            top={280}
            position="absolute"
            p="6"
          >
            <HStack display="flex" flexDir="column" gap="4">
              <Box w="150%">
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

                      {item.body}


                      <HStack justify="center" paddingTop='5vw'>
                        <Box marginLeft='30vw'   >
                        <ChevronUpIcon
                          cursor='pointer'
                          onClick={() => VotarComentarios(item.id)}
                          color='#47c200'
                          _hover={{ color: "#488624" }}
                          w={8} h={8} />
                        {item.voteSum || 0}
                        <ChevronDownIcon
                          cursor='pointer'
                          onClick={() => ComentariosPut(item.id)}
                          color='#c70000'
                          _hover={{ color: "#810101" }}
                          w={8} h={8} />

                      </Box>
                    </HStack>
                    </Text>

                  </>

                )) : (<Spinner color='#fd7f00' size='xl' />)}

              </Box>
            </HStack>
          </Center>
        </Center>
      </Flex>
    </Box>
  );
}


export default PostPage;