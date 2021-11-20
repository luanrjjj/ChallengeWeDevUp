import React, { useEffect, useState } from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import useHistory from "react-router-dom";

import Header from "../../components/Header";

import { useCart } from "../../hooks/useCart";
import { formatPrice } from "../../util/format";
import { Container, ProductTable, Total } from "./styles";

import {Car} from '../../types'


const Cart = (): JSX.Element => {
  const { cart, removeProduct, addProduct } = useCart();
 
  const[cartCar,setCartCar] = useState(cart)

  const [totalValue,setTotalValue] = useState<number>() 

 
  const handleIncreaseDistance= async(car:Car) => {

    if(car.distance<car.availability.maxDistance) {
      const updatedCart = [...cart];
    const productExist = updatedCart.find(
      (product) => product.id === car.id
    );
    if (productExist) {
    const index = updatedCart.indexOf(productExist)
    const distanceNew = car.distance + 50
    const newProduct = {
      ...car,
      distance:distanceNew,
      subTotal: CalculateTheRentalPriceWithDiscount(
        car.duration,
        distanceNew,
        car.pricePerDay,
        car.pricePerKm
      )
     
    }
    updatedCart[index]  = newProduct
    localStorage.setItem("@RentCar:cart",JSON.stringify(updatedCart))
    setCartCar(updatedCart)
  }
    }
    

  }

  const handleDecreaseDistance= async(car:Car) => {

    
    const updatedCart = [...cart];
    const productExist = updatedCart.find(
      (product) => product.id === car.id
    );
    if (productExist) {
    const index = updatedCart.indexOf(productExist)
    const distanceNew = car.distance - 50
    const newProduct = {
      ...car,
      distance:distanceNew,
      subTotal: CalculateTheRentalPriceWithDiscount(
        car.duration,
        distanceNew,
        car.pricePerDay,
        car.pricePerKm
      )
     
    }
    updatedCart[index]  = newProduct
    localStorage.setItem("@RentCar:cart",JSON.stringify(updatedCart))
    setCartCar(updatedCart)
  }

  }


  const handleIncreaseDuration= async(car:Car) => {

    if(car.duration<car.availability.maxDuration) {
      const updatedCart = [...cart];
      const productExist = updatedCart.find(
        (product) => product.id === car.id
      );
      if (productExist) {
      const index = updatedCart.indexOf(productExist)
      const durationNew = car.duration + 1
      const newProduct = {
        ...car,
        duration:durationNew,
        subTotal: CalculateTheRentalPriceWithDiscount(
          durationNew,
          car.distance,
          car.pricePerDay,
          car.pricePerKm
        )

      }
      updatedCart[index]  = newProduct
      localStorage.setItem("@RentCar:cart",JSON.stringify(updatedCart))
      setCartCar(updatedCart)
    }
    } else return
   

  }


  const handleDecreaseDuration= async(car:Car) => {
    const updatedCart = [...cart];
    const productExist = updatedCart.find(
      (product) => product.id === car.id
    );
    if (productExist) {
    const index = updatedCart.indexOf(productExist)
    const durationNew = car.duration - 1
    const newProduct = {
      ...car,
      duration:durationNew,
      subTotal: CalculateTheRentalPriceWithDiscount(
        durationNew,
        car.distance,
        car.pricePerDay,
        car.pricePerKm
      )
    }
    updatedCart[index]  = newProduct
    localStorage.setItem("@RentCar:cart",JSON.stringify(updatedCart))
    setCartCar(updatedCart)
  }

  }

 
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
    } else if (duration >= 4) {
       priceDayWithDiscount = priceDay * 0.7;
    } else if (duration >= 10) {
      priceDayWithDiscount = priceDay * 0.5;
    }
    return duration * priceDayWithDiscount + distance * priceKm;
  }

  

  function handleRemoveProduct(car:Car) {
    removeProduct(car);
  }
  function handleAddProduct(car:Car) {
    addProduct(car,car.availability.maxDistance,car.availability.maxDuration);
  }
  
 function TotalValue () {
 
 }

 useEffect(()=> {
  let total = 0 
   cartCar.map(product=> {
     total+= product.subTotal
   })

   setTotalValue(total)
 },[cartCar])


  
  return (
    <>
    <Header/>
    <Container>
      
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="car image" />
            <th>Car Model</th>
            <th>Distance</th>
            <th>Duration</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
            {cartCar?.map((car) => (
                    <tr key={car.id} data-testid="car">

                    <td>
                      <img src={car.picturePath} alt={car.brand} />
                    </td>
                    <td>
                      <strong>{car.brand}</strong>
                      <span>{car.model}</span>
                    </td>
                    <td>
                      <div>
                        <button
                          type="button"
                          data-testid="decrement-car"
                          disabled={car.distance <= 0}
                          onClick={() => handleDecreaseDistance(car)} 
                        >
                          <MdRemoveCircleOutline size={20}
                       />
                        </button>
                        <input
                          type="text"
                          data-testid="car-amount"
                          readOnly
                          value={car.distance}
                          
                        />
                        <button type="button" data-testid="increment-car"
                         disabled={car.distance >= car.availability.maxDistance} >
                          <MdAddCircleOutline size={20}
                           onClick={() => handleIncreaseDistance(car)}
                          />
                       
                        </button>
                      </div>
                    </td>
                    <td>
                    <div>
                        <button
                          type="button"
                          data-testid="decrement-car"
                          disabled={car.duration <= 0}
                          onClick={() => handleDecreaseDuration(car)}
                        >
                          <MdRemoveCircleOutline size={20}
                       />
                        </button>
                        <input
                          type="text"
                          data-testid="car-amount"
                          readOnly
                          value={car.duration}
                        />
                        <button type="button" data-testid="increment-car"
                        disabled={car.duration >= car.availability.maxDuration}>
                          <MdAddCircleOutline size={20}
                           onClick={() => handleIncreaseDuration(car)} />
                         
                        </button>
                      </div>
                    </td>
                    <td>
                      {formatPrice(car.subTotal)}
                    </td>
                    <td>
                      <button
                        type="button"
                        data-testid="remove-car"
                        onClick={() => handleRemoveProduct(car)}
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>

            ))
            }
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{formatPrice(totalValue as number)}</strong>
        </Total>
      </footer>
    </Container>
    </>
  );
};

export default Cart;