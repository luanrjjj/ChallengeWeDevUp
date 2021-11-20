import { createContext, ReactNode, useContext, useState } from "react";

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<CartContextData>({} as CartContextData);
interface Car {
  id: number;
  brand: string;
  model: string;
  picturePath: string;
  pricePerDay: number;
  pricePerKm: number;
  availability: {
    maxDuration: number;
    maxDistance: number;
  };
  duration: number;
  distance: number;
  distangeRange: number[];
  durationRange: number[];
  subTotal:number;
}

interface CartContextData {
  cart: Car[];
  addProduct: (car: Car, distance: number, duration: number) => Promise<void>;
  removeProduct: (car: Car) => void;
}

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Car[]>(() => {
    const storagedCart = localStorage.getItem("@RentCar:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (car: Car, distance: number, duration: number) => {
    const updatedCart = [...cart];

    const distanceRange = [];
    const durationRange = [];

    for (let i = 50; i <= car.availability.maxDistance; i = i + 50) {
      distanceRange.push(i);
    }

    for (let i = 1; i <= car.availability.maxDuration; i++) {
      durationRange.push(i);
    }

    const productExist = updatedCart.find((product) => product.id === car.id);
    if (!productExist) {
      const newProduct = {
        ...car,
        distance: distance,
        duration: duration,
        distanceRange,
        durationRange,
        subTotal: CalculateTheRentalPriceWithDiscount(
          duration,
          distance,
          car.pricePerDay,
          car.pricePerKm
        ),
      };
      updatedCart.push(newProduct);
      setCart(updatedCart);

      localStorage.setItem("@RentCar:cart", JSON.stringify(updatedCart));
    } else if (productExist) {
      const index = updatedCart.indexOf(productExist);
      const newProduct = {
        ...car,
        distance: distance,
        duration: duration,
      };
      updatedCart[index] = newProduct;
    }
  };

  const removeProduct = async (car: Car) => {
    const updatedCart = [...cart];
    const productExist = updatedCart.find((product) => product.id === car.id);

    if (productExist) {
      var i;
      for (i = 0; i < updatedCart.length; i++) {
        if (updatedCart[i].id === car.id) {
          updatedCart.splice(i, 1);
          setCart(updatedCart);
          localStorage.setItem("@RentCar:cart", JSON.stringify(updatedCart));
        }
      }
    } else {
      console.log("Erro na remoção do produto");
    }
  };

  function CalculateTheRentalPriceWithDiscount(
    duration: number,
    distance: number,
    priceDay: number,
    priceKm: number
  ) {
    let priceDayWithDiscount = priceDay;
    if (duration > 1) {
      priceDayWithDiscount = priceDay * 0.9;
    } else if (duration >= 4) {
      priceDayWithDiscount = priceDay * 0.7;
    } else if (duration >= 10) {
      priceDayWithDiscount = priceDay * 0.5;
    }
    return duration * priceDayWithDiscount + distance * priceKm;
  }

  return (
    <CartContext.Provider value={{ cart, addProduct, removeProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
