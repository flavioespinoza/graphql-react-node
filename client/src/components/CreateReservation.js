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

		this.state = {
            confirm_arrivalDate: null,
            confirm_departureDate: null,
            confirm_hotelName: null,
            confirm_id: null,
            confirm_name: null,
        }

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
          }).then((res) => {
            let reservation = res.data.data.createReservation
            console.log(reservation)
            let confirmation = {
                confirm_arrivalDate: reservation.arrivalDate,
                confirm_departureDate: reservation.departureDate,
                confirm_hotelName: reservation.hotelName,
                confirm_id: reservation.id,
                confirm_name: reservation.name
            }
            this.setState(confirmation)
          })
          .catch((err) => {
              console.error(err)
          })
		
	}

	render () {

		return (
			<section>
				
                <PrimaryButton
                    data-automation-id="Reservation"
                    text="Create Reservation"
                    onClick={() => {this._createReservation(chance.first(), chance.last(), 'Hilton NYC', '5/24/19', '6/24/19')}}
                />

                {this.state.confirm_id ? <div>
                    <h3>Confirmation for {this.state.confirm_name}</h3>
                    <ul>
                        <li>Reservation ID: {this.state.confirm_id}</li>
                        <li>Arrival Date: {this.state.confirm_arrivalDate}</li>
                        <li>Departure Date: {this.state.confirm_departureDate}</li>
                        <li>Hotel: {this.state.confirm_hotelName}</li>
                    </ul>
                </div> : null}

			</section>
		)
	};

}

export { CreateReservation }