import React from "react";

const TablePage = () => {

 const wetherApi = async () => {
     try {
        const data = await fetch("http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=8729216ccd5739e2c784419fd4618420").then(res => res.json());
        console.log(data);
     } catch (error) {
         console.error(error);
         
     }

    
 }
 wetherApi();

  return (
    <div className="container">
      <table className="highlight centered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Item Name</th>
            <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
