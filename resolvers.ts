import { Collection, ObjectId } from "mongodb"
import { RestaurantModel } from "./types.ts"
import { GraphQLError } from "graphql";

type context ={
    restaurantsCollection: Collection<RestaurantModel>,
}

type getRestaurantArgs={
    id: string,
}
export const resolvers ={
    Query:{
        getRestaurant:async(_:unknown, args:getRestaurantArgs,ctx:context): Promise<RestaurantModel|null> =>{
            const restauranteEncontrado = await ctx.restaurantsCollection.findOne({_id:new ObjectId(args.id)});
            if(!restauranteEncontrado)throw new GraphQLError("Restaurante no encontrado");
            return restauranteEncontrado;
        }
    },

    Restaurant:{
        id:(parent:RestaurantModel): string =>{return parent._id!.toString();}

    }
}