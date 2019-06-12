import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

import TicketRecordsTable from '../../components/TicketRecords/TicketRecordsTable';

class TicketRecords extends Component {
    render() {
        return (
            <Card>
                <CardHeader>Ticket Records</CardHeader>
                <CardBody>
                    <TicketRecordsTable/>
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;