import {OptionalId} from "mongodb"

export type RestaurantModel = OptionalId<{
    name: string,
    address: string,
    city: string,
    number: string,
    country: string,
}>


//https://api.api-ninjas.com/v1/city
export type APIcity ={
    latitude: number,
    longitude: number,
}

//https://api.api-ninjas.com/v1/worldtime
export type APIworldtime={
  datetime: string,
}

//https://api.api-ninjas.com/v1/weather
export type APIweather ={
    temp:number,
}


//https://api.api-ninjas.com/v1/validatephone
export type APIvalidatephone ={
    is_valid: boolean,
    country: string,
    timezones: string[],
}

export type APItimezone ={
    timezone: string,
}