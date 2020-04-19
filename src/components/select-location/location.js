import React from "react";

import "./location.css";
import data from "./location-data.json";
import iftarImg from "../../assets/images/iftar.png";
import bluePin from "../../assets/images/bluepin.png";
import backBtn from "../../assets/images/back_btn.svg";

const locationList = data.data.collection_points.data;

class Location extends React.Component {
  // state = {
  //     locations: []
  // }
  // async componentDidMount() {
  //     const requestOptions = {
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' },
  //     };

  //     var  apiUrl = ""//'https://share-your-iftar-backend.herokuapp.com/api/collection-points';

  //     const response = await fetch(apiUrl, requestOptions);
  //     const data = await response.json();
  //     this.setState({ locations: data });
  // }

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            <div>&nbsp;</div>
          </div>
          <div className="row">
            <h2>
              <img src={backBtn} className="imgSml" alt="Back" />
              &nbsp;Select a Location
            </h2>
          </div>
          <div className="d-flex flex-row">
            <div class="card" style={{ width: "18rem" }}>
              <div class="d-flex p-1">
                <div class="p-2">
                  {" "}
                  <img src={iftarImg} className="imgMid" alt="Iftar" />
                </div>
                <div class="p-1">
                  <h5 class="card-title" nowrap>
                    East London Centre
                  </h5>
                  <div class="d-flex p-1">
                    <div class="p-1">
                      <img src={bluePin} className="imgSml" alt="Marker" />
                    </div>
                    <div class="p-1">
                      {" "}
                      <p class="card-text">0.5m</p>
                    </div>
                  </div>
                  <div class="d-flex p-1">
                    <div class="p-1">&nbsp;</div>
                    <div class="p-1">300 meals left</div>
                  </div>
                  <div class="d-flex p-1">
                    <div class="p-1">&nbsp;</div>
                    <div class="p-1">
                      <a href="/#" class="btn btn-primary">
                        Select
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <hr width="100%" />
              <div class="d-flex p-1">
                <div class="p-2">
                  {" "}
                  <img src={iftarImg} className="imgMid" alt="Iftar" />
                </div>
                <div class="p-1">
                  <h5 class="card-title">Whitechaple Centre</h5>
                  <div class="d-flex p-1">
                    <div class="p-1">
                      <img src={bluePin} className="imgSml" alt="Marker" />
                    </div>
                    <div class="p-1">
                      {" "}
                      <p class="card-text">0.7m</p>
                    </div>
                  </div>
                  <div class="d-flex p-1">
                    <div class="p-1">&nbsp;</div>
                    <div class="p-1">150 meals left</div>
                  </div>
                  <div class="d-flex p-1">
                    <div class="p-1">&nbsp;</div>
                    <div class="p-1">
                      <a href="/#" class="btn btn-primary">
                        Select
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Location;
