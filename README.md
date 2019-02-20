# GraphQL - Node, Apollo, React Change

> This project was setup for the <img src="img/pwc_logo.png" width="40" style="padding-left: 6px; margin-bottom: -3px;"> team to evaluate my GraphQL skills.

---

## Node Express - GraphOL - back   
This project has a MongoDB sandbox setup on mLab.com.  
  
In the `root folder` create a `.env` file with the following Node Environment Varaibles:

```bash
NODE_ENV=development
  
MONGODB_URI=mongodb://graphql_user:BigFish1$1@ds335275.mlab.com:35275/graphql
```

```bash{.copy-clip-test}
npm install
```

```bash {.copy-clip-test}
npm start
```

--
  
Navigate to http://localhost:4000/my-markets
  
Here you can test my mutation method to add a market to the existing MongoDB on mLab.com
  
```graphql
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

---
  
## Axios with external GraphQL endpoint
  
> cd into the client folder 
```bash{.env-code}
npm install
```
```bash{.env-code}
npm start
```
Navigate to http://localhost:8080
  
### Create Reservation
 
> Create a reservation and get confirmation using Hilton Hotels dev GraphQL endpoint.
  
'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
  
### Axios is used inside a React method to post mutations to GraphQL
  
```javascript
_createReservation (firstName, lastName, hotelName, arrivalDate, departureDate) {
    
    const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

    axios({
        url: _endpoint,
        method: 'post',
        data: {
            query: `
                mutation {
                    createReservation(
                        data: {
                                name: "${firstName} ${lastName}" // <-- MUST USE DOUBLE QUOTES
                                hotelName: "${hotelName}"
                                arrivalDate: "${arrivalDate}"
                                departureDate: "${departureDate}"
                        }
                    )   {
                        id
                        name
                        hotelName
                        arrivalDate
                        departureDate
                    }
                }
        `
        }
    })
    .then(res => {
        let reservation = res.data.data.createReservation
        let confirmation = {
            confirm_arrivalDate: reservation.arrivalDate,
            confirm_departureDate: reservation.departureDate,
            confirm_hotelName: reservation.hotelName,
            confirm_id: reservation.id,
            confirm_name: reservation.name
        }
        this.setState(confirmation)
    })
    .catch(err => {
        console.error(err)
        alert(err.message)
    })
}
```
![](img/localhost.png?0.8317726698521553 )  

---

## Apollo Client

> Setup Apollo Client in App.js
  
```javascript
import * as React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
  
const client = new ApolloClient({
	uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
})
```
> Bind query for all reservations to Reservations.js Component
```javascript
import * as React from 'react'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import { DetailsList, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner'
import { Fabric } from 'office-ui-fabric-react/lib/Fabric'
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { ReservationsList } from './ReservationsList'
import _ from 'lodash'
  
const reservations = `
	{
		reservations {
			name
			hotelName
			arrivalDate
			departureDate
			id
		}
	}
`
const getMarketsQuery = gql`${reservations}`
  
const childClass = mergeStyles({
	display: 'block',
	marginBottom: '10px'
})
  
class Res extends React.Component {
	constructor (props) {
		super(props)
  
        this._onColumnClick = this._onColumnClick.bind(this)
  
		this._columns = [
			{
				key: 'name',
				name: 'Customer',
				fieldName: 'name',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.name}</span>)
				}
			},
			{
				key: 'hotelName',
				name: 'Hotel',
				fieldName: 'hotelName',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.hotelName}</span>)
				}
			},
			{
				key: 'arrivalDate',
				name: 'Arrival',
				fieldName: 'arrivalDate',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.arrivalDate}</span>)
				}
			},
			{
				key: 'departureDate',
				name: 'Departure',
				fieldName: 'departureDate',
				minWidth: 100,
				maxWidth: 200,
				isResizable: true,
				onRender: (item) => {
					return (<span>{item.departureDate}</span>)
				}
			}
		]
  
		this.state = {
			columns: this._columns
		}
  
    }
  
    _onColumnClick () {
        console.log('Column Clicked')
    }
  
	render () {
  
		const { columns } = this.state
  
		let reservations = []
  
		if (this.props.data.reservations) {
			reservations = _.filter(this.props.data.reservations, (obj) => {
				return obj.name !== ''
			})
		}
  
		return (
			<section>
				{reservations.length > 0 ? <section>
					<ReservationsList items={reservations} columns={columns} />
				</section> : <Spinner size={SpinnerSize.large} label="Loading all reservations.." ariaLive="assertive" labelPosition="right" />}
			</section>
        )
  
    }
  
}
  
const Reservations = graphql(getMarketsQuery)(Res)
  
export { Reservations } 
  
```

### The Apollo query is bound to the component an retrieves all reservations from the external endpoint
  
> Create a reservation then refresh. You can now search for your reservation in the list below by first and last name.
  
![](img/list.png?0.9571717133047106 )  
  
