import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { Button, Card, Form, Input, Select, Typography } from "antd";
import { useForm } from "react-hook-form";
import { Cards, CardsSection, FiltersSection,Content } from "./styles";
import Header from '../../components/Header/index';
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import {Car} from '../../types'

const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;
const { Title } = Typography;



export const Home: React.FC = () => {
  const [allData, setAllData] = useState<Car[]>([]);
  const [allDataFiltered, setAllDataFiltered] = useState<any>();
  const {  handleSubmit } = useForm({});
  const [form] = Form.useForm();
  const { addProduct } = useCart();
  const formResult: any = [];

  

  const distanceRange = [];
  const durationRange = [];

  for (let i = 50; i <= 3000; i = i + 50) {
    distanceRange.push(i);
  }

  for (let i = 1; i <= 30; i++) {
    durationRange.push(i);
  }

  useEffect(() => {
    api.get("cars.json").then((response) => setAllData(response.data));
  }, []);
   
  const onSubmit = (values: any) => {
    formResult.push(values);

    api.get(`cars.json?duration=${formResult[0] }?distance=${formResult[1]}`).then((response) => 
    setAllData(response.data));
    form.resetFields();
  };

  function CalculateTheRentalPrice(
    duration: number,
    distance: number,
    priceDay: number,
    priceKm: number
  ) {
    return duration * priceDay + distance * priceKm;
  }

  function CalculateTheRentalPriceWithDiscount(
    duration: number,
    distance: number,
    priceDay: number,
    priceKm: number
  ) {
    let priceDayWithDiscount =priceDay
    if (duration > 1) {
      priceDayWithDiscount = priceDay * 0.9;
    } else if (duration > 4) {
       priceDayWithDiscount = priceDay * 0.7;
    } else if (duration > 10) {
      priceDayWithDiscount = priceDay * 0.5;
    }
    return duration * priceDayWithDiscount + distance * priceKm;
  }

  function handleAddProduct(car:Car) {
    addProduct(car,car.availability.maxDistance,car.availability.maxDuration);
  }

  return (
    <>
    <Header/>
    <Content>
    <FiltersSection>
      <Form layout='vertical' onFinish={handleSubmit(onSubmit)} className="form" form={form}>
        <Form.Item
          name="distance"
          label="Distance"
          rules={[
            {
              required: true,
              message: "Please select your distance!",
              type: "number",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              formResult[1]=value;
            }}
            placeholder="Choose the distance"
          >
            {distanceRange.map((distance) => {
              return (
                <Option key={distance} value={distance}>
                  {distance}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration of rent"
          rules={[
            {
              required: true,
              message: "Please select your duration!",
              type: "number",
            },
          ]}
        >
          <Select
            onChange={(value) => {
              formResult[0] = value;
            }}
            placeholder="Choose the duration"
          >
            {durationRange.map((duration) => {
              return (
                <Option key={duration} value={duration}>
                  {duration}
                </Option>
              );
            })}
          </Select>

        </Form.Item>

        <Button htmlType="submit" type="primary" style={{ marginTop: 20 }}>
          Submit
        </Button>
      </Form>

      <Button onClick={()=>  api.get("cars.json").then((response) => setAllData(response.data))}type="primary">Clean Filters</Button>
      </FiltersSection>
      <CardsSection>
      <Cards>
        {allDataFiltered
          ? allDataFiltered.map((car: Car) => {
              return (
                <li key={car.id} className="Card">
                  <h1>{car.brand}</h1>
                </li>
              );
            })
          : allData.map((car: Car) => {
              return (
                <li key={car.id} className="Card">
                   <h1>{car.brand}</h1>
                  <img  alt = '' src={car.picturePath}/>
                 
                  <p>Normal Price: 
                     {formatPrice(CalculateTheRentalPrice(
                      car.availability.maxDuration,
                      car.availability.maxDistance,
                      car.pricePerDay,
                      car.pricePerKm
                    ))}
                  </p>

                  <p>
                     Discounted Price:
                    {formatPrice(CalculateTheRentalPriceWithDiscount(
                      car.availability.maxDuration,
                      car.availability.maxDistance,
                      car.pricePerDay,
                      car.pricePerKm
                    ))}
                  </p>


                  <button
                       type="button"
                       data-testid="add-product-button"
                       onClick={() =>
                         handleAddProduct(car)
                       }
                     
                    >
                      <div data-testid="cart-product-quantity">
                        <MdAddShoppingCart size={16} color="#FFF" />
                      </div>
                      <span>ADD TO CART</span>
                    </button>
                </li>
              );
            })}
     </Cards>
     </CardsSection>
     </Content>
    </>
   
  );
 
};
