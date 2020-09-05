import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHttp } from "../../hooks/http.hook";
import Loader from "../Loader";

const GreenhouseCard = ({ greenhouse, greenhouseDelete }) => {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);

  const onDeleteClick = async (id, e) => {
    e.preventDefault();
    try {
      await request(
        "/api/admin/greenhouses",
        "DELETE",
        { id },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      greenhouseDelete(id);
    } catch (error) {}
  };

  if(loading) {
      return (
          <div className="col s3">
              <Loader/>
          </div>
      )
  }
  return (
    <div key={greenhouse._id} className="col s3">
      <div className="card sticky-action">
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt="greenhouse"
            className="activator avatar"
            src={greenhouse.imgData}
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
          <div className="center">
            <a href="/" className="waves-effect waves-light btn red darken-2">
              <i className="material-icons left">delete</i>Изменить
            </a>
          </div>
          <div className="center">
            <a
              href="/"
              onClick={onDeleteClick.bind(null, greenhouse._id)}
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
};

export default GreenhouseCard;
