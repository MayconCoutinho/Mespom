import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToVoltar } from '../../routes/coordinator';
import {
  Flex,
  Box,
  Center,
  FormControl,
  Input,
  HStack,
  Button,
  Image,
  Text,
  Checkbox
} from "@chakra-ui/react";
import { useForm } from '../../hooks/useForm';
import { LoginToken } from '../../components/Token/Token';
import Logo from '../../assets/logo.png'

const CadastroPage = () => {

  LoginToken()

  const navigate = useNavigate()

  const { formValues, onChange, cleanFields } = useForm({
    name: "",
    email: "",
    password: "",
  })


  const FazerCadastro = (event) => {

    event.preventDefault()
    console.log(formValues)
    cleanFields()
  }

  return (
    <Box h="100vh">
      <Center
        bg="#EDEDED"
        pb="2"
        boxShadow="0 2px 2px #ccc"
      >
        <Center>
          <Image paddingTop={1.5} marginLeft={20} boxSize='40px' src={Logo} alt='Dan Abramov' />
          <Button
            left={55}
            color='#4088CB'
            _hover={{ color: "#022444" }}

            colorScheme='#4088CB'
            variant='ghost'
            onClick={() => goToVoltar(navigate)}
          > Entrar </Button>

        </Center>


      </Center>

      <HStack spacing="4" justify="center" marginTop='10vw' display="flex" flexDir="column" >

        <Box>

        </Box>
        <Box>
          <Center >

            <Text marginLeft={5} fontSize='3xl' fontWeight={700} > Olá, boas vindas ao LabEddit ;) </Text>

          </Center>
        </Box>
      </HStack>
      <Flex
        align="center"
        justify="center"
      >
        <Center
          w="100%"
          height={330}
          top={280}
          position="absolute"
          p="6"
        >
          <form onSubmit={FazerCadastro}>
            <FormControl display="flex" flexDir="column" gap="4">
              <Box w="100%">
                <Input
                  name='name'
                  type='text'
                  value={formValues.name || ''}
                  placeholder="Nome"
                  onChange={onChange} />
              </Box>
              <Box w="100%">
                <Input
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

              <Box>
                <Center marginBottom={4} marginTop={4}>

                  <Text fontSize='xs' fontWeight={500} color='#ff003c' > Ao continuar, você concorda com o nosso Contrato de usuário
                    e nossa Politica de privacidade
                  </Text>

                </Center>

                <Center  marginTop={4}>
                  <Checkbox size='md' colorScheme='orange' defaultChecked/>
                  <Text fontSize='xs' fontWeight={500} marginLeft={2}> Eu concordo em receber emails sobre coisas legais no Labeddit
                  </Text>

                </Center>
              </Box>

              <HStack justify="center">
                <Button
                  w={300}
                  p="6"
                  type="submit"
                  bg="linear-gradient(90deg, #FF6489 0%, #F9B24E 100%)"
                  _hover={{ bg: 'linear-gradient(90deg, #fd446fd2 0%, #f8a633c0 100%)' }}
                  borderRadius={50}
                  color="white"
                  fontWeight="bold"
                  fontSize="xl"
                  mt="8"
                >
                  Cadastrar
                </Button>
              </HStack>
            </FormControl>
          </form>
        </Center>
      </Flex>
    </Box>

  );
}


export default CadastroPage;