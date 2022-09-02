import React from 'react';
import { useNavigate } from 'react-router-dom';
import { goToVoltar} from '../../routes/coordinator';
import { Button } from '@chakra-ui/react'

const ErrorPage = () => {

  const navigate = useNavigate()
  
  return (
          <div>
            <h4>  A pagina não existe </h4>
            <Button colorScheme='teal' variant='solid' onClick={() => goToVoltar(navigate)}> voltar </Button>
          </div>
   
  );
}


export default ErrorPage;