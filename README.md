# GraphQL React Node Examples
This project has a MongoDB sandbox setup on mLab.com.  
This db was setup for the <img src="/img/pwc_logo.png" width="40" style="padding-left: 6px; margin-bottom: -3px;"> team for this evaluation of my GraphQL skills.

> Step 1.

In the `root folder` create a `.env` file with the following Node Environment Varaibles:
```bash{.env-code}
NODE_ENV=development

MONGODB_URI=mongodb://graphql_user:BigFish1$1@ds335275.mlab.com:35275/graphql
```
> Step 2.
```bash{.env-code}
npm install
```
> Step 3.
```bash{.env-code}
npm start
```
--

Navigate to http://localhost:5001/my-markets

Here you can test my mutation method to add a market to the existing MongoDB on mLab.com

```graphql{.white-code}
mutation {
  addMarket(_id: "CCLETH", base: "CCL", quote: "ETH", symbol: "CCL/ETH", pairing:"CCLETH", market_name:"ETH_CCL") {
    base
    quote
    pairing
    symbol
    market_name
  }
}
```