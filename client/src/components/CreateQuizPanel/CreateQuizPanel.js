import React, { useState } from "react";
import {useHttp} from '../../hooks/http.hook'
import { useAuth } from "../../hooks/auth.hook";
const CreateQuizPanel = () => {
  const [state, setState] = useState({
    quizLevel: "",
    quizName: "",
    quizTheme: "",
  });

  const { request } = useHttp();
  const auth = useAuth();

  const pressKeyHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/quizes/create",
          "POST",
          { name: state.quizName, level: state.quizLevel, theme: state.quizTheme },
          { Authorization: `Bearer ${auth.token}` }
        );
        console.log(data);
       // history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  const onChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  if (!state) return <h2>Error</h2>;
  return (
    <div>
      <label htmlFor="">Название: </label>
      <input
        value={state.quizName}
        onChange={onChangeHandler}
        name="quizName"
        type="text"
        onKeyPress={pressKeyHandler}
      />
      <label htmlFor="">Тема: </label>
      <input
        value={state.quizTheme}
        onChange={onChangeHandler}
        name="quizTheme"
        type="text"
        onKeyPress={pressKeyHandler}
      />
      <label htmlFor="">Сложность: </label>
      <input
        value={state.quizLevel}
        onChange={onChangeHandler}
        name="quizLevel"
        type="text"
        onKeyPress={pressKeyHandler}
      />
    </div>
  );
};

export default CreateQuizPanel;
