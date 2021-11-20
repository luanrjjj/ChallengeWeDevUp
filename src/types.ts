export interface Car {
    id: number;
    brand: string;
    model: string;
    picturePath: string;
    pricePerDay: number;
    pricePerKm: number;
    availability: {
      maxDuration: number;
      maxDistance: number
    };
   duration:number;
   distance:number;
   distangeRange:number[],
   durationRange:number[];
   subTotal:number;
    
  }