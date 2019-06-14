import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import TicketRecordsTable from '../../components/TicketRecords/TicketRecordsTable';
import AddTicket from '../../components/TicketRecords/AddTicket';

class TicketRecords extends Component {
    render() {
        return (
            <Card>
                <CardHeader>
                    <div className="card-header-actions">
                        <AddTicket />
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