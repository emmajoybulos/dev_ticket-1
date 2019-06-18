import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

import FullCalendar from '../../components/Calendar/FullCalendar';

class Calendar extends Component {

    render() {
        return(
            <Card>
                <CardBody>
                    <FullCalendar />
                </CardBody>
            </Card>
            
        )
    }
}

export default Calendar