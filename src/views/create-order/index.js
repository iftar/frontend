import React, { useState } from 'react';
import { Container, Card, Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import HeadingText from '../../components/element-wrappers/HeadingText';
import CircleIconButton from '../../components/button/CircleIconButton';
import View from '../../components/element-wrappers/View';
import { useHistory } from 'react-router-dom';

import bluePin from "../../assets/images/bluepin.png";

const CreateOrder = (collectionPoint) => {

  // dummy data
  const _collecitonPoint = {
    name: 'East London Mosque',
    address: 'Whitecapel Road E1 1JQ',
    miles: '0.5',
    mealsLeft: 300,
    mealCountOptions: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    times: ["13:00", "16:00"]
  }

  const [iftarCount, setIftarCount] = useState(null)
  const [deliveryOrCollection, setDeliveryOrCollection] = useState(null)
  const [time, setTime] = useState(null)
  const [address, setAddress] = useState(null)

  const history = useHistory();
  function onBackButtonClick() {
    history.goBack();
  }

  function handleSubmit() {
    // Triggered by confirm button on confirmation modal
  }

  return (
    <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", paddingBottom: "40px" }}>
      <View style={{ display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center" }}>
        <CircleIconButton onClick={onBackButtonClick} />
        <HeadingText style={{ fontWeight: "bold", fontSize: "2em" }}> Collection Name </HeadingText>
      </View>

      <View style={{ display: "flex", flexDirection: "column", width: "100%", justifyContent: "flex-start", alignItems: "center" }}>
        <Card style={{ width: "100%", marginBottom: "32px" }}>
          <div class="d-flex p-1">
            <div class="p-1" style={{ width: "100%" }}>
              <div class="d-flex p-1" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div class="p-1">
                  <img src={bluePin} className="imgSml" alt="Marker" />
                </div>
                <div class="p-1">
                  <p class="card-text">{_collecitonPoint.address}</p>
                </div>
                <div class="p-1">
                  <p class="card-text">{_collecitonPoint.miles}m</p>
                </div>
              </div>
              <div class="d-flex p-1" style={{ display: "flex", width: "100%" }}>
                <div class="p-1">
                  <img src={bluePin} className="imgSml" alt="Marker" /> {/* Update icon */}
                </div>
                <div class="p-1">
                  <p class="card-text">{_collecitonPoint.mealsLeft} meals left</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ width: "100%", marginBottom: "32px" }}>
          <div class="d-flex p-1">
            <div class="p-1" style={{ width: "100%" }}>
              <div class="d-flex p-1" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div class="p-1">
                  <p class="card-text">How many iftar packs?</p>
                </div>
                <div class="p-1">
                  <p class="card-text">
                    <Form>
                      <Form.Group controlId="iftarMealsCount">
                        <Form.Control as="select" value={iftarCount} custom onSelect={(value) => setIftarCount(value)}>
                          {_collecitonPoint.mealCountOptions.map(option => (
                            <option>{option}</option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ width: "100%", marginBottom: "32px" }}>
          <ButtonGroup toggle >
            <ToggleButton type="radio" name="radio" checked={deliveryOrCollection === "Collection"} onClick={() => setDeliveryOrCollection("Collection")} value="Collection">
              Collection
            </ToggleButton>
            <ToggleButton type="radio" name="radio" checked={deliveryOrCollection === "Delivery"} onClick={() => setDeliveryOrCollection("Delivery")} value="Delivery">
              Delivery
            </ToggleButton>
          </ButtonGroup>
        </Card>

        {deliveryOrCollection === "Delivery" && <Card style={{ width: "100%", marginBottom: "32px" }}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Address</Form.Label>
            <Form.Control as="textarea" rows="3" value={address} onChange={() => setAddress()} />
          </Form.Group>
        </Card>}

        <Button variant="primary" onClick={() => alert("Open confirmation modal")}>Submit</Button>
      </View>
    </Container>
  )
}

export default CreateOrder
