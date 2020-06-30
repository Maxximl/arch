import React from "react";
import AddGreenhouseForm from '../../components/AddGreenhouseForm';
import "./AddGreenhousePage.css";

const AddGreenhousePage = () => {

  return (
    <div className="container">
      <h2 className="center">Добавить теплицу</h2>
      <AddGreenhouseForm />
    </div>
  );
};

export default AddGreenhousePage;
