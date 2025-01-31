import { Collection, ObjectId } from "mongodb"
import { RestaurantModel } from "./types.ts"
import { GraphQLError } from "graphql";

type context ={
    restaurantsCollection: Collection<RestaurantModel>,
}

type getRestaurantArgs={
    id: string,
}

type getRestaurantsArgs={
    name: string,
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
            return restaurantes;
        }
    },

    Restaurant:{
        id:(parent:RestaurantModel): string =>{return parent._id!.toString();}

    }
}