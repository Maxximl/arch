import React, { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useHttp } from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";
import "./AddGreenhousePage.css";

const AddGreenhousePage = () => {
  const [state, setState] = useState({
    name: "",
    description: "",
    imgData: "",
    fileName: "",
  });

  const { request } = useHttp();
  const auth = useAuth();
  const history = useHistory();

  const onChangeHandler = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setState({
        ...state,
        file: file.name,
        imgData: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };
  const addHandler = async () => {
    try {
      const data = await request(
        "/api/admin/greenhouses/create",
        "POST",
        {
          name: state.name,
          description: state.description,
          imgData: state.imgData,
          fileName: state.fileName,
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      console.log(data);
      history.push(`/greenhouses`);
    } catch (error) {}
  };

  return (
    <div className="container">
      <h2>Добавить теплицу</h2>
      <div className="input-field">
        <input
          value={state.name}
          onChange={onChangeHandler}
          id="name"
          name="name"
          type="text"
          className="validate"
        />
        <label htmlFor="name">Название</label>
      </div>
      <div className="input-field">
        <input
          value={state.description}
          onChange={onChangeHandler}
          id="description"
          name="description"
          type="text"
          className="validate"
        />
        <label htmlFor="description">Описание</label>
      </div>
      <div className="file-field input-field">
        <div className="btn">
          <span>Фото</span>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <div className="right">
        <a onClick={addHandler} className="waves-effect waves-light btn-large">
          <i className="material-icons left">add_circle_outline</i>Добавить
        </a>
      </div>
      <img className="photo-preview" src={state.imgData} />
    </div>
  );
};

export default AddGreenhousePage;
