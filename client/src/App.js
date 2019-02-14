import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import { MarketList } from './components/MarketList'
import { Reservations } from './components/Reservations'
import { CreateReservation } from './components/CreateReservation'
import { DeleteReservation } from './components/DeleteReservation'

const client = new ApolloClient({
	// uri: 'http://localhost:4000/my-markets',
	uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev',
})

class App extends React.Component {
	render () {
		return (
			<ApolloProvider client={client}>

				<div id={'main'}>

					<CreateReservation/>

				</div>

			</ApolloProvider>
		)
	}
}

export default App