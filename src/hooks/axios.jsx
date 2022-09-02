import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/URL/BASE_URL";
import { goToFeedPage } from "../routes/coordinator";


export const Login = (email, password, navigate) => {
  axios
    .post(
      `${BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      }
    )
    .then((response) => {
      window.localStorage.setItem("token", response.data.token)
      goToFeedPage(navigate)
    })
    .catch((err) => {
      alert('Senha errada!')
    });


};

export const GetPost = (paginaAtual) => {

  const token = window.localStorage.getItem("token")

  const [getTripsList, setGetTripsList] = useState([])
  const [tempo, setTempo] = useState(0)

  const atualizar = setTimeout(() => {

    setTempo(tempo + 1)
    
  }, 0.5 * 1000) || false


  useEffect(() => {

    axios
      .get(
        `${BASE_URL}/posts?page=${paginaAtual}&size=${8}`, { headers: { Authorization: token } }
      )
      .then((response) => {
        setGetTripsList(response.data)
        atualizar()
      })
      .catch((err) => {
        console.log(err);
      });

  }, [paginaAtual, tempo])



  return getTripsList

}

export const GetPostComments = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")
  const [tempo, setTempo] = useState(0)

  const atualizar = setTimeout(() => {

    setTempo(tempo + 1)
    
  }, 1 * 1000) || false

  const [getTripsList, setGetTripsList] = useState([])

  useEffect(() => {

    axios
      .get(
        `${BASE_URL}/posts/${id}/comments`, { headers: { Authorization: token } }
      )
      .then((response) => {
        setGetTripsList(response.data)
        atualizar()
      })
      .catch((err) => {
        console.log(err);
      });

  }, [tempo])

  return getTripsList

}


export const CreatePost = (title, comentario) => {

  const token = window.localStorage.getItem("token")

  const body = {
    title: title,
    body: comentario,
  };

  axios
    .post(
      `${BASE_URL}/posts`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
    });

}



export const CreateComment = (dados) => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  const body = {
    body: dados.comentario
  };

  axios
    .post(
      `${BASE_URL}/posts/${id}/comments`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
    });

}


export const CreatePostVote = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  const body = {
    direction: 1
  };

  axios
    .post(
      `${BASE_URL}/posts/${id}/votes`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)

    })
    .catch((err) => {
      console.log(err);
    });



}


export const ChangePostVote = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  const body = {
    direction: -1
  };

  axios
    .put(
      `${BASE_URL}/posts/${id}/votes`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)

    })
    .catch((err) => {
      console.log(err);
    });

}


export const CreateCommentVote = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  const body = {
    direction: 1
  };

  axios
    .post(
      `${BASE_URL}/comments/${id}/votes`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err);
    });



}

export const ChangeCommentVote = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  const body = {
    direction: -1
  };

  axios
    .put(
      `${BASE_URL}/comments/${id}/votes`, body, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)

    })
    .catch((err) => {
      console.log(err);
    });

}



export const DeletePostVote = () => {

  const token = window.localStorage.getItem("token")

  const id = window.localStorage.getItem("IdPost")

  axios
    .delete(
      `${BASE_URL}/posts/${id}/votes`, { headers: { Authorization: token } }
    )
    .then((response) => {
      console.log(response)

    })
    .catch((err) => {
      console.log(err);
    });

}

