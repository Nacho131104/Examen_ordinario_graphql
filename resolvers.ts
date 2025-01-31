import { Collection, ObjectId } from "mongodb"
import { RestaurantModel } from "./types.ts"
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
export const resolvers ={
    Query:{
        getRestaurant:async(_:unknown, args:getRestaurantArgs,ctx:context): Promise<RestaurantModel|null> =>{
            const restauranteEncontrado = await ctx.restaurantsCollection.findOne({_id:new ObjectId(args.id)});
            if(!restauranteEncontrado)throw new GraphQLError("Restaurante no encontrado");
            return restauranteEncontrado;
        },

        getRestaurants:async(_:unknown,args:getRestaurantsArgs,ctx:context):Promise<RestaurantModel[]|null> =>{
            const restaurantes = await ctx.restaurantsCollection.find({name:args.name}).toArray();
            if(!restaurantes)throw new GraphQLError("No se encontraron restaurantes con ese nombre");
            console.log(restaurantes)
            return restaurantes;
        }
    },

    Mutation:{
        addRestaurant:async(_:unknown,args:addRestaurantArgs,ctx:context):Promise<boolean> =>{
            const {name,address,city,number}=args;
            const numeroExistente = await ctx.restaurantsCollection.findOne({number});
            if(numeroExistente)throw new GraphQLError("Ya existe un restaurante con este numero de telefono");

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