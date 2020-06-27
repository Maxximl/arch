import React, { useState, useEffect, useContext, useCallback } from "react";
import { useHttp } from "../../hooks/http.hook";
import { AuthContext } from "../../context/AuthContext";
import CreateQuizPanel from "../../components/CreateQuizPanel";
import styles from "./QuizCreatePage.module.scss";

const QuizCreatePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2>Создать квиз</h2>

          <CreateQuizPanel />

      </div>
    </div>
  );
};

export default QuizCreatePage;
