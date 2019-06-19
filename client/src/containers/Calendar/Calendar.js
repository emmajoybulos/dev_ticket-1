import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import axios from 'axios';

import FullCalendar from '../../components/Calendar/FullCalendar';

class Calendar extends Component {

    state = {
        issues: []
    }

    componentDidMount () {
        axios.get('/calendar')
            .then(response => {
                this.setState({ issues: response.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return(
            <Card>
                <CardBody>
                    <FullCalendar issues={this.state.issues.issues} />
                </CardBody>
            </Card>
            
        )
    }
}

export default Calendar