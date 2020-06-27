import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import styles from "./QuizPage.module.scss";
import { useHistory } from "react-router-dom";

const QuizPage = () => {
  const [quizes, setQuizes] = useState([]);
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const clickCreateHandler = () => {
    history.push("/quizes/create");
  };

  const getQuizes = useCallback(async () => {
    try {
      const fetched = await request(`/api/quizes/`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setQuizes(fetched);
      console.log(fetched);
    } catch (error) {}
  }, [request, auth.token]);

  useEffect(() => {
    getQuizes();
  }, [getQuizes]);

  if (loading) return <Loader />;

  if (!quizes.length)
    return (
      <div className={styles.container}>
        Пусто
        <button onClick={clickCreateHandler}>Создать квиз</button>
      </div>
    );
  return (
    <div className="container">
      <ul>
        {quizes.map((quiz) => {
          return <li>{quiz.name}</li>;
        })}
      </ul>
      <button onClick={clickCreateHandler}>Создать квиз</button>
    </div>
  );
};

export default QuizPage;
