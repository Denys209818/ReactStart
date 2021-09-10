import logo from './logo.svg';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from "jquery";
import axios from 'axios';


function App() {
  return (
      <>
          <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
              <div className="container-fluid">
                  <a className="navbar-brand">Головна сторінка</a>
                  <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#mainNav">
                      <span className="navbar-toggler-icon"></span>
                  </button>

                  <div id="mainNav" className="collapse navbar-collapse">
                      <ul className="navbar-nav">
                          <li className="nav-item">
                              <a className="nav-link active">Домашня</a>
                          </li>
                      </ul>
                  </div>
              </div> 
          </nav>

          <div className="container mt-3">
              <h2 class="text-center mb-4">Продукти</h2>
              <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                      <tr>
                          <th scope="col">Номер</th>
                          <th scope="col">Назва</th>
                          <th scope="col">Ціна</th>
                          <th scope="col">Фотографії</th>
                      </tr>
                  </thead>

                  <tbody id="tbody">

                  </tbody>
              </table>
          </div>

          
      </>
  );
}

$(function () {
    var $tbody = $("#tbody");

    var $rows = $("#tbody tr");
    $rows.each(index => {
        $rows[index].remove();
    });

    axios.post("/Product/GetAll")
        .then(result => {
            var data = JSON.parse(JSON.stringify(result["data"]));
            console.log(data[0]);
            for (var i = 0; i < data.length; i++)
            {
                var $newTr = $(`<tr>
                    <td scope="row">${data[i]["Id"]}</td>
                    <td>${data[i]["Name"]}</td>
                    <td>${data[i]["Price"]}</td>
                </tr>`);

                var $imgBlock = $(`<div class="d-flex flex-row">

                </div>`);
                var $imgTd = $(`<td>
                        </td>`);

                for (var y = 0; y < data[i]["Images"].length; y++)
                {
                    $imgBlock.append(
                        `<img src="/images/${data[i]["Images"][y]}" 
                        width="60" height="60"/>`);
                }
                $imgTd.append($imgBlock);

                $newTr.append($imgTd);

                $("#tbody").append($newTr);
            }
        });
});

export default App;
