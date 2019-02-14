const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log
const _ = require('lodash')

const graphql = require('graphql')

const Market = require('../model/market')
const Exchange = require('../model/exchange')

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql

const MarketType = new GraphQLObjectType({
    name: 'Market',
    fields: () => ({
		_id: {type: GraphQLID},
        base: {type: GraphQLString},
        quote: {type: GraphQLString},
        pairing: {type: GraphQLString},
        symbol: {type: GraphQLString},
        market_name: {type: GraphQLString},
        market_id: {type: GraphQLString},
        exchange: {
            type: ExchangeType,
            resolve(parent, args) {
                log.lightMagenta(parent)
                log.lightCyan(args)
            }
        }
    })
})

const ExchangeType = new GraphQLObjectType({
    name: 'Exchange',
    fields: () => ({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        url: {type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        all_markets: {
            type: new GraphQLList(MarketType),
            resolve(parent, args) {
                return Market.find({})
            }
        },
        market_by_symbol: {
            type: MarketType,
            args: {
                symbol: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Market.find({symbol: args.symbol})
            }
        },
        market_by_pairing: {
            type: MarketType,
            args: {
                pairing: {type: GraphQLID}
            },
            resolve(parent, args) {
                return Market.find({pairing: args.pairing})
            }
        },
        all_exchanges: {
            type: new GraphQLList(ExchangeType),
            resolve(parent, args) {
                return Exchange.find({})
            }
        },
        exchange_by_name: {
            type: ExchangeType,
            args: {
                name: {type: GraphQLString}
            },
            resolve(parent, args) {
                return Exchange.findOne({name: args.name})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMarket: {
            type: MarketType,
            args: {
                base: {type: new GraphQLNonNull(GraphQLString)},
                quote: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let market = new Market({
					_id: `${args.base}${args.quote}`,
                    base: args.base,
                    quote: args.quote,
                    symbol: `${args.base}/${args.quote}`,
                    pairing: `${args.base}${args.quote}`,
                    market_name: _.toLower(`${args.base}_${args.quote}`), 
                    market_id: `${args.quote}-${args.base}`
                })
                return market.save()
            }
        },
        addExchange: {
            type: ExchangeType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                url: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let exchange = new Exchange({
                    _id: args.name,
                    name: args.name,
                    url: args.url
                })
                return exchange.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})