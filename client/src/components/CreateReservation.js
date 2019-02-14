import * as React from 'react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { graphql } from 'react-apollo'
import axios from 'axios'
import Chance from 'chance'

const chance = new Chance()


class CreateReservation extends React.Component {
	constructor (props) {
		super(props)

        this._createReservation = this._createReservation.bind(this)

		this.state = {}

	};

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
                            name: "${firstName} ${lastName}"
                            hotelName: "${hotelName}"
                            arrivalDate: "${arrivalDate}"
                            departureDate: "${departureDate}"
                        }
                        ) {
                            id
                            name
                            hotelName
                            arrivalDate
                            departureDate
                        }
                    }
                `
            }
          }).then((result) => {
            console.log(result.data)
          });
		
	}

	render () {

		return (
			<section>
				
                <PrimaryButton
                    data-automation-id="Reservation"
                    text="Create Reservation"
                    onClick={() => {this._createReservation(chance.first(), chance.last(), 'Hilton NYC', '5/24/19', '6/24/19')}}
                />


			</section>

		)
	};

}

export { CreateReservation }