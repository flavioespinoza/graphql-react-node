const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log
const _ = require('lodash')

const graphql = require('graphql')

const Reservation = require('../model/reservation')

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

const ReservationType = new GraphQLObjectType({
    name: 'Reservation',
    fields: () => ({
		id: {type: GraphQLID},
        name: {type: GraphQLString},
        hotelName: {type: GraphQLString},
        arrivalDate: {type: GraphQLString},
        departureDate: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        all_reservations: {
            type: new GraphQLList(ReservationType),
            resolve(parent, args) {
                return Reservation.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createReservation: {
            type: ReservationType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                hotelName: {type: new GraphQLNonNull(GraphQLString)},
                arrivalDate: {type: new GraphQLNonNull(GraphQLString)},
                departureDate: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                let reservation = new Reservation({
                    data: {
                        name: args.name,
                        hotelName: args.hotelName,
                        arrivalDate: args.arrivalDate,
                        departureDate: args.departureDate,
                    }
                })
                return market.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})