const _log = require('@flavioespinoza/log_log')._log
const log = require('@flavioespinoza/log_log').log
const _ = require('lodash')

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
		_id: obj.id,
		base: obj.baseCurrency,
		quote: obj.quoteCurrency,
		symbol: `${obj.baseCurrency}/${obj.quoteCurrency}`,
		pairing: `${obj.baseCurrency}${obj.quoteCurrency}`,
		market_name: `${obj.quote}_${obj.baseCurrency}`
	}
})