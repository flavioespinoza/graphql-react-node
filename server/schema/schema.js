const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log
const _ = require('lodash')

const graphql = require('graphql')

const Market = require('../model/market')

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql

const MarketType = new GraphQLObjectType({
    name: 'Market',
    fields: () => ({
		_id: {type: GraphQLString},
        base: {type: GraphQLString},
        quote: {type: GraphQLString},
        pairing: {type: GraphQLString},
        symbol: {type: GraphQLString},
        market_name: {type: GraphQLString}
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMarket: {
            type: MarketType,
            args: {
				_id: {type: GraphQLString},
                base: {type: GraphQLString},
                quote: {type: GraphQLString},
                symbol: {type: GraphQLString},
                pairing: {type: GraphQLString},
                market_name: {type: GraphQLString}
            },
            resolve(parent, args) {
                let market = new Market({
					_id: args._id,
                    base: args.base,
                    quote: args.quote,
                    symbol: args.symbol,
                    pairing: args.pairing,
                    market_name: args.market_name
                })
                market.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        market: {
            type: MarketType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // return _.find(markets, {id: args.id})

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
