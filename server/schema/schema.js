const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log
const _ = require('lodash')

const graphql = require('graphql')

const {
	GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLSchema,
    GraphQLID
} = graphql


const rest_json = [
    {
        "id": "BTCUSD",
        "baseCurrency": "BTC",
        "quoteCurrency": "USD",
        "quantityIncrement": "0.00001",
        "tickSize": "0.01",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "USD"
    }, 
    {
        "id": "DASHBTC",
        "baseCurrency": "DASH",
        "quoteCurrency": "BTC",
        "quantityIncrement": "0.001",
        "tickSize": "0.000001",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "BTC"
    }, 
    {
        "id": "DOGEBTC",
        "baseCurrency": "DOGE",
        "quoteCurrency": "BTC",
        "quantityIncrement": "10",
        "tickSize": "0.00000000001",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "BTC"
    }, 
    {
        "id": "DOGEUSD",
        "baseCurrency": "DOGE",
        "quoteCurrency": "USD",
        "quantityIncrement": "10",
        "tickSize": "0.00000001",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "USD"
    }, 
    {
        "id": "EMCBTC",
        "baseCurrency": "EMC",
        "quoteCurrency": "BTC",
        "quantityIncrement": "0.1",
        "tickSize": "0.000000001",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "BTC"
    }, 
    {
        "id": "ETHBTC",
        "baseCurrency": "ETH",
        "quoteCurrency": "BTC",
        "quantityIncrement": "0.0001",
        "tickSize": "0.000001",
        "takeLiquidityRate": "0.001",
        "provideLiquidityRate": "-0.0001",
        "feeCurrency": "BTC"
    }
]

const markets = _.map(rest_json, (obj) => {
    return {
        id: obj.id,
        base: obj.baseCurrency,
        quote: obj.quoteCurrency,
        pairing: obj.id,
        symbol: `${obj.baseCurrency}/${obj.quoteCurrency}`,
        increment: +obj.quantityIncrement,
        tick: +obj.tickSize,
        makerFee: +obj.provideLiquidityRate,
        takerFee: +obj.takeLiquidityRate,
        feeCurrency: obj.feeCurrency
    }
})

const obj_model = {          
    id: "BTCUSD",
    base: "BTC",
    quote: "USD",
    pairing: "BTCUSD",
    symbol: "BTC/USD",
    increment:  0.00001,
    tick:  0.01,
    makerFee:  -0.0001,
    takerFee:  0.001,
    feeCurrency: "USD"      
}

const MarketType = new GraphQLObjectType({
    name: 'Market',
    fields: () => ({
        id: {type: GraphQLID},
        base: {type: GraphQLString},
        quote: {type: GraphQLString},
        pairing: {type: GraphQLString},
        symbol: {type: GraphQLString},
        increment: {type: GraphQLFloat},
        tick: {type: GraphQLFloat},
        makerFee: {type: GraphQLFloat},
        takerFee: {type: GraphQLFloat},
        feeCurrency: {type: GraphQLString}
    })
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
                return _.find(markets, {id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})