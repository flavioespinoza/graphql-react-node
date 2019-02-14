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
