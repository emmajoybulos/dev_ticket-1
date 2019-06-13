import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Card, CardBody } from 'reactstrap';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class Calendar extends Component {
    render() {
        return(
            <Card>
                <CardBody>
                <FullCalendar defaultView="dayGridMonth" plugins={[dayGridPlugin]} />
                </CardBody>
            </Card>
            
        )
    }
}

export default Calendar