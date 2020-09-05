import React, { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { useHttp } from "../../hooks/http.hook";
import { useHistory } from "react-router-dom";
import "./AddGreenhouseForm.css";

const AddGreenhouseForm = ({
  idx = "-1",
  name = "",
  description = "",
  imgData = "",
  fileName = "",
  type = "add",
  onReloadHandler,
}) => {
  const [state, setState] = useState({
    name,
    description,
    imgData,
    fileName,
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
  const addHandler = async (e) => {
    e.preventDefault();
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
      history.push(`/greenhouses`);
    } catch (error) {}
  };

  const editHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await request(
        "/api/admin/greenhouses",
        "PUT",
        {
          name: state.name,
          description: state.description,
          imgData: state.imgData,
          fileName: state.fileName,
        },
        { Authorization: `Bearer ${auth.token}` }
      );
      onReloadHandler(data);
    } catch (error) {}
  };

  return (
    <div className="container">
      <div className="input-field">
        <input
          value={state.name}
          onChange={onChangeHandler}
          id={`name${idx}`}
          name="name"
          type="text"
          className="validate"
        />
        <label htmlFor={`name${idx}`}>Название</label>
      </div>
      <div className="input-field">
        <input
          value={state.description}
          onChange={onChangeHandler}
          id={`description${idx}`}
          name="description"
          type="text"
          className="validate"
        />
        <label htmlFor={`description${idx}`}>Описание</label>
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
        <a
          href="/"
          onClick={type === "add" ? addHandler : editHandler}
          className="waves-effect waves-light btn-large"
        >
          <i className="material-icons left">add_circle_outline</i>
          {type === "add" ? "Добавить" : "Изменить"}
        </a>
      </div>
      <img alt="avatar" className="photo-preview" src={state.imgData || ""} />
    </div>
  );
};

export default AddGreenhouseForm;
