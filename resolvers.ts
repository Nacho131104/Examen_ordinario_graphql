import { Collection, ObjectId } from "mongodb"
import { RestaurantModel } from "./types.ts"
import { GraphQLError } from "graphql";

type context ={
    restaurantsCollection: Collection<RestaurantModel>,
}

type getRestaurantArgs={
    id: ObjectId,
}
export const resolvers ={
    Query:{
        getRestaurant:async(_:unknown, args:getRestaurantArgs,ctx:context): Promise<RestaurantModel> =>{
            const restauranteEncontrado = await ctx.restaurantsCollection.findOne({_id:args.id});
            if(!restauranteEncontrado)throw new GraphQLError("Restaurante no encontrado");
            return restauranteEncontrado;
        }
    }
}