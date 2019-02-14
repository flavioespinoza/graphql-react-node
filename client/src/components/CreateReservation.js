import * as React from 'react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { graphql } from 'react-apollo'
import axios from 'axios'


const newReservation = (name, hotelName, arrivalDate, departureDate) => {
    return `
        mutation {
            createReservation(
                data: {
                    name: ${name}
                    hotelName: ${hotelName}
                    arrivalDate: ${arrivalDate}
                    departureDate: ${departureDate}
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

class CreateReservation extends React.Component {
	constructor (props) {
		super(props)

        this._postReservation = this._postReservation.bind(this)

		this.state = {

		}

	};

	_postReservation () {

        const _endpoint = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

        axios({
            url: _endpoint,
            method: 'post',
            data: {
              query: `
                    mutation {
                        createReservation(
                        data: {
                            name: "Ren"
                            hotelName: "Hilton NYC"
                            arrivalDate: "2/28/19"
                            departureDate: "3/12/19"
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
                    data-automation-id="stuff"
                    text="Post Shit"
                    onClick={this._postReservation}
                />


			</section>

		)
	};

}

export { CreateReservation }