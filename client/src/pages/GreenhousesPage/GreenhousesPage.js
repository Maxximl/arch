import React, { useEffect, useContext } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import Loader from "../../components/Loader";
import "./Greenhouses.css";
import { connect } from "react-redux";
import {
  greenhousesLoaded,
  greenhouseDelete,
  greenhouseEdited,
} from "../../redux/actions";
import { bindActionCreators } from "redux";
import GreenhouseCard from "../../components/GreenhouseCard/GreenhouseCard";

const GreenhousesPage = ({
  greenhouses,
  greenhousesLoaded,
  greenhouseDelete,
}) => {
  const { request, loading } = useHttp();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onAddHandler = (e) => {
    e.preventDefault();
    history.push("/admin/greenhouses/create");
  };
  const getGreenhouses = useCallback(async () => {
    try {
      const fetched = await request(`/api/greenhouses/`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      greenhousesLoaded(fetched);
    } catch (error) {
      console.error(error);
    }
  }, [auth.token, request, greenhousesLoaded]);

  useEffect(() => {
    getGreenhouses();
  }, [getGreenhouses]);

  const addButton = (
    <div className="col s12 center">
      <a
        href="/"
        onClick={onAddHandler}
        className="waves-effect waves-light btn-large"
      >
        <i className="material-icons left">add_circle_outline</i>Добавить
      </a>
    </div>
  );
  if (loading) {
    return <Loader />;
  }

  if (!greenhouses.length) {
    return (
      <div>
        <h2>Теплиц еще нет</h2>
        {addButton}
      </div>
    );
  }

  return (
    <div className="row">
      <div className="row">
        {greenhouses.map((greenhouse) => {
          return (
            <GreenhouseCard
              key={greenhouse._id}
              greenhouse={greenhouse}
              greenhouseDelete={greenhouseDelete}
            />
          );
        })}
      </div>
      {addButton}
    </div>
  );
};

const mapStateToProps = ({ greenhouses }) => {
  return { greenhouses };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      greenhousesLoaded,
      greenhouseDelete,
      greenhouseEdited,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GreenhousesPage);
