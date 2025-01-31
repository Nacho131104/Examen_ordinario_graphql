import {OptionalId} from "mongodb"

export type RestaurantModel = OptionalId<{
    name: string,
    address: string,
    city: string,
    number: string,
    country: string,
    temperature:string,
    datetime: string,
}>


//https://api.api-ninjas.com/v1/city
export type APIcity ={
    name: string,
    latitude: number,
    longitude: number,
    country: string
}

//https://api.api-ninjas.com/v1/worldtime
export type APItimezone={
  datetime: string,
}

//https://api.api-ninjas.com/v1/weather
export type APIweather ={
    temp:number,
}