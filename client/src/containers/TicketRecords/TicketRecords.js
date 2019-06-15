import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import TicketRecordsTable from '../../components/TicketRecords/TicketRecordsTable';
import AddTicket from '../../components/TicketRecords/AddTicket';

class TicketRecords extends Component {
    state = {
        ticket_id: '',
    }

    handleChange = (event) => {
        this.setState({ ticket_id: event.target.value });
    }

    handleClick = (event) => {
        console.log(this.state.ticket_id);
    }
    
    render() {
        return (
            <Card>
                <CardHeader>
                    <div className="card-header-actions">
                        <AddTicket change={this.handleChange} click={this.handleClick} />
                    </div>
                </CardHeader>
                <CardBody>
                    <TicketRecordsTable/>
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;