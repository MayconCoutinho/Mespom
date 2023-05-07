import axios from "axios";
import { BASE_URL } from "../components/URL/BASE_URL";
import { goToFeedPage } from "../routes/coordinator";

export const LoginPost = async (email, password, navigate) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/login`, {
      email: email,
      password: password,
    });

    window.localStorage.setItem("token", response.data.token);
    goToFeedPage(navigate);
  } catch (error) {
    alert("Senha errada!");
  }
  return false;
};

export const RegisterUser = (name, email, password) => {
  axios
    .post(`${BASE_URL}/users/signup`, {
      name,
      email,
      password,
    })
    .then((response) => {
      alert("Cadastrado com sucesso!");
    })
    .catch((err) => {
      alert("Senha errada!");
    });
};

export const GetPost = async (paginaAtual) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${BASE_URL}/posts?page=${paginaAtual}&size=${8}`,
      {
        headers: { Authorization: token },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const GetPostComments = async () => {
  const token = window.localStorage.getItem("token");
  const id = window.localStorage.getItem("IdPost");

  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}/comments`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
};

export const CreatePost = async (title, comentario) => {
  const token = window.localStorage.getItem("token");

  const body = {
    title: title,
    body: comentario,
  };

  try {
    await axios.post(`${BASE_URL}/posts`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};

export const CreateComment = async (dados) => {
  const token = window.localStorage.getItem("token");

  const id = window.localStorage.getItem("IdPost");

  const body = {
    body: dados.comentario,
  };

  try {
    await axios.post(`${BASE_URL}/posts/${id}/comments`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};

export const CreatePostVote = async () => {
  const token = window.localStorage.getItem("token");

  const id = window.localStorage.getItem("IdPost");

  const body = {
    direction: 1,
  };

  try {
    await axios.post(`${BASE_URL}/posts/${id}/votes`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};
export const ChangePostVote = async () => {
  const token = window.localStorage.getItem("token");

  const id = window.localStorage.getItem("IdPost");

  const body = {
    direction: -1,
  };

  try {
    await axios.put(`${BASE_URL}/posts/${id}/votes`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};

export const CreateCommentVote = async (id) => {
  const token = window.localStorage.getItem("token");

  const body = {
    direction: -1,
  };

  try {
    await axios.put(`${BASE_URL}/comments/${id}/votes`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};

export const ChangeCommentVote = async (id) => {
  const token = window.localStorage.getItem("token");

  const body = {
    direction: -1,
  };

  try {
    await axios.put(`${BASE_URL}/comments/${id}/votes`, body, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};

export const DeletePostVote = async () => {
  const token = window.localStorage.getItem("token");

  const id = window.localStorage.getItem("IdPost");

  try {
    await axios.delete(`${BASE_URL}/posts/${id}/votes`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.log(error.response);
  }
  return false;
};
