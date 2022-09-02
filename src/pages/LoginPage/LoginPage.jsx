import { useNavigate } from 'react-router-dom';
import { goToCadastroPage, goToFeedPage } from '../../routes/coordinator';
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
  Spinner
} from "@chakra-ui/react";
import { useForm } from '../../hooks/useForm';
import { Login } from '../../hooks/axios';
import { LoginToken } from '../../components/Token/Token';
import Logo from '../../assets/logo.png'
import { useState } from 'react';

const LoginPage = () => {
  
  LoginToken()

  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  const { formValues, onChange} = useForm({
    email: "",
    password: "",
  })

  const FazerLogin = (event) => {
    setCarregando(true)
    event.preventDefault()
    Login(formValues.email, formValues.password , navigate)

    setTimeout(() => {

      setCarregando(false)
      
    }, 2 * 1000) 
  
  }

  return (
    <Box h="100vh">

      <Flex
        align="center"
        justify="center"
      >
        <HStack spacing="4" justify="center" marginTop='5vw' display="flex" flexDir="column" >
          <Box>
            <Center >
              <Image boxSize='75px' src={Logo} alt='Dan Abramov' />
            </Center>
          </Box>
          <Box>
            <Center >
              <Text fontWeight={700} fontSize='4xl'> LabEddit </Text>
            </Center>
          </Box>
          <Box>
            <Center >
              <Text fontWeight={450} fontSize='sm'> O projeto de rede social da Labenu </Text>
            </Center>
          </Box>
        </HStack>

        <Center
          w="100%"
          height={330}
          top={280}
          position="absolute"
          p="6"
        >
          <form onSubmit={FazerLogin}>
            <FormControl display="flex" flexDir="column" gap="4">
              <Box w="100%">
                <Input
                  w={300}
                  name='email'
                  type="email"
                  value={formValues.email || ''}
                  placeholder="E-mail"
                  onChange={onChange} />
              </Box>
              <HStack spacing="4">
                <Box w="100%">
                  <Input
                    name='password'
                    type='password'
                    value={formValues.password || ''}
                    placeholder="Senha"
                    onChange={onChange} />
                </Box>
              </HStack>
              <HStack spacing="4" justify="center">
                <Button
                  w={300}
                  p="6"
                  type="submit"
                  bg="linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"
                  _hover={{ bg : 'linear-gradient(90deg, #ff6488d3 0%, #f9b24ec0 100%)'}}

                  borderRadius={50}
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="2"
                  marginTop={10}
                >
                  {carregando ? <Spinner color='#000000' size='md' /> : <h1>Continuar </h1> }
                </Button>
              </HStack>
              
              <Divider orientation='horizontal' marginTop='2vw' padding={.499} bg='linear-gradient(90deg, #ff003c 0%, #ff9500 100%)' />
              <Center
          w="100%"
          maxW={840}
          top={220}
          position="absolute"
          p="6"
        >
          <Button
            w={300}
            minW={300}
            p="6"
            type="submit"
            bg="#ffffff0"
            color="#FE7E02"
            fontWeight="bold"
            fontSize="xl"
            mt="2"
            borderRadius={50}
            borderColor="#FE7E02"
            _hover={{ bg : '#faab601f'}}
            variant='outline'
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
}


export default LoginPage;


