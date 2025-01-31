import { Collection, ObjectId } from "mongodb"
import { RestaurantModel,APIvalidatephone } from "./types.ts"
import { GraphQLError } from "graphql";
import { stringify } from "node:querystring";

type context ={
    restaurantsCollection: Collection<RestaurantModel>,
}

type getRestaurantArgs={
    id: string,
}

type getRestaurantsArgs={
    name: string,
}
type addRestaurantArgs={
    name: string,
    address: string,
    city: string,
    number: string,
}

type deleteRestaurantArgs={
    id:string,
}
export const resolvers ={
    Query:{
        getRestaurant:async(_:unknown, args:getRestaurantArgs,ctx:context): Promise<RestaurantModel|null> =>{
            const restauranteEncontrado = await ctx.restaurantsCollection.findOne({_id:new ObjectId(args.id)});
            if(!restauranteEncontrado)throw new GraphQLError("Restaurante no encontrado");
            return restauranteEncontrado;
        },

        getRestaurants:async(_:unknown,args:getRestaurantsArgs,ctx:context):Promise<RestaurantModel[]|null> =>{
            const restaurantes: RestaurantModel[] = await ctx.restaurantsCollection.find({name:args.name}).toArray();
            if(!restaurantes)throw new GraphQLError("No se encontraron restaurantes con ese nombre");
    
            return restaurantes;
        }
    },

    Mutation:{
        addRestaurant:async(_:unknown,args:addRestaurantArgs,ctx:context):Promise<boolean> =>{
            const {name,address,city,number}=args;
            const numeroExistente = await ctx.restaurantsCollection.findOne({number});
            if(numeroExistente)throw new GraphQLError("Ya existe un restaurante con este numero de telefono");
            const API_KEY = Deno.env.get("API_KEY");
            if(!API_KEY)throw new GraphQLError("Se necesita una api key para acceder a las apis")
            
            const url = `https://api.api-ninjas.com/v1/validatephone?number=${number}`;
            const data = await fetch(url,{
                headers:{
                    "X-API-KEY":API_KEY,
                }
            })
            if(data.status !==200)throw new GraphQLError("Error en la api ninja")
            const response: APIvalidatephone = await data.json();
            if(!response.is_valid)throw new GraphQLError("El numero de telefono no es valido")
            const {insertedId} = await ctx.restaurantsCollection.insertOne({
                name,
                address,
                city,
                number,
                country: response.country,
            })
            if(insertedId)return false;
            return true;
        },

        deleteRestaurant:async(_:unknown,args:deleteRestaurantArgs,ctx:context):Promise<boolean> =>{
            const{id} = args;
            const  borrado = await ctx.restaurantsCollection.findOneAndDelete({_id: new ObjectId(id)})
            if(!borrado) return false;
            return true;
        }

    },

    Restaurant:{
        id:(parent:RestaurantModel): string =>{return parent._id!.toString();},
        address:(parent:RestaurantModel):string =>{
            const direccion: string = parent.address + ", "+parent.city + ", "+parent.country;
            return direccion;
        }
    


    }
}