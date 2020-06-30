import React, { useState, useEffect, useContext } from "react";
import greenhouseImg from "./images/greenhouse.jpg";
import { useHttp } from "../../hooks/http.hook";
import { useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Greenhouses.css";
import ModalEdit from "../../components/ModalEdit/ModalEdit";

const GreenhousesPage = () => {
  const [greenhouses, setGreenhouses] = useState([]);
  const [dummy, reload] = useState(false);
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onReloadHandler = () => {
    reload(!dummy);
  }
  const onAddHandler = (e) => {
    e.preventDefault();
    history.push("/admin/greenhouses/create");
  };
  const getGreenhouses = useCallback(async () => {
    try {
      const fetched = await request(`/api/greenhouses/`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setGreenhouses(fetched);
    } catch (error) {
      console.error(error);
    }
  }, [auth.token, request]);

  const onDeleteClick = async (name, e) => {
    e.preventDefault();
    try {
      await request(
        "/api/greenhouses/",
        "POST",
        { name: name },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );

      setGreenhouses(greenhouses.filter((el) => el.name !== name));
    } catch (error) {}
  };

  useEffect(() => {}, [greenhouses]);

  useEffect(() => {
    getGreenhouses();
  }, [getGreenhouses]);

  if (loading) {
    return <Loader />;
  }
  if (!greenhouses.length) {
    return (
      <div>
        <h2>Теплиц еще нет</h2>
        <div className="col s12 center">
          <a
            href="/"
            onClick={onAddHandler}
            className="waves-effect waves-light btn-large"
          >
            <i className="material-icons left">add_circle_outline</i>Добавить
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="row">
        {greenhouses.map((greenhouse, idx) => {
          return (
            <div key={greenhouse._id} className="col s3">
              <ModalEdit
                onReloadHandler={onReloadHandler}
                type="edit"
                id={`modal${idx}`}
                name={greenhouse.name}
                description={greenhouse.description}
                imgData={greenhouse.imgData}
                fileName={greenhouse.fileName}
              />
              <div className="card sticky-action">
                <div className="card-image waves-effect waves-block waves-light">
                  <img
                    alt="greenhouse"
                    className="activator avatar"
                    src={greenhouse.imgData || greenhouseImg}
                  />
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">
                    {greenhouse.name}
                    <i className="material-icons right">more_vert</i>
                  </span>
                  <p>
                    <a href="/">Запустить диагностику</a>
                  </p>
                </div>
                <div className="card-action">
                  <div className="center button">
                    <a
                      className="waves-effect waves-light btn blue darken-3 modal-trigger"
                      href={`#modal${idx}`}
                    >
                      <i className="material-icons left">edit</i>Изменить
                    </a>
                  </div>
                  <div className="center">
                    <a
                      href="/"
                      onClick={onDeleteClick.bind(null, greenhouse.name)}
                      className="waves-effect waves-light btn red darken-2"
                    >
                      <i className="material-icons left">delete</i>Удалить
                    </a>
                  </div>
                </div>
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">
                    Показатели<i className="material-icons right">close</i>
                  </span>

                  <div>
                    <table className="highlight">
                      <thead>
                        <tr>
                          <th>Параметр</th>
                          <th>Текущее значение</th>
                          <th>Норма</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Температура</td>
                          <td>+23</td>
                          <td>+20</td>
                        </tr>
                        <tr>
                          <td>Влажность</td>
                          <td>60%</td>
                          <td>50%</td>
                        </tr>
                        <tr>
                          <td>Радиация</td>
                          <td>0.5мклнг</td>
                          <td>0.004мклг</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="center button"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="col s12 center">
        <a
          href="/"
          onClick={onAddHandler}
          className="waves-effect waves-light btn-large"
        >
          <i className="material-icons left">add_circle_outline</i>Добавить
        </a>
      </div>
    </div>
  );
};

export default GreenhousesPage;
