import React from "react";
import greenhouseImg from "./images/greenhouse.jpg";

const GreenhousesPage = () => {
  const data = [1, 2, 3, 4];

  return (
    <div className="row">
      {data.map((dat) => {
        return (
          <div className="col s3">
            <div className="card sticky-action">
              <div className="card-image waves-effect waves-block waves-light">
                <img
                  alt="greenhouse"
                  className="activator"
                  src={greenhouseImg}
                />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {`Номер теплицы: ${dat}`}
                  <i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="/">Запустить диагностику</a>
                </p>
              </div>
              <div className="card-action">...</div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Показатели<i className="material-icons right">close</i>
                </span>
                <p>
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
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GreenhousesPage;
