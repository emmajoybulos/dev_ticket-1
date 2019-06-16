import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import AddTicket from '../../components/TicketRecords/AddTicket';
import MainTable from '../../components/TicketRecords/MainTable';
import SearchTicket from '../../components/TicketRecords/SearchTicket';
import Pagination from '../../components/TicketRecords/Pagination/Pagination';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 3000 });

class TicketRecords extends Component {
    state = {
        ticket_id: '',
        tickets: []
    }

    componentDidMount () {
        axios.get('/tickets')
        .then(response => {
            this.setState({ tickets: response.data })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange = (event) => {
        this.setState({ ticket_id: event.target.value });
    }

    handleClick = (event) => {
        axios.post('/tickets', {
            ticket_id: this.state.ticket_id
        })
        .then(response => {
            console.log(response);
            
            this.setState({ ticket_id: '' });

            toast.success("Ticket saved!");

        })
        .catch(err => {
            console.log(err)
        })
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
                    <Row>
                        <Col md={{ size: 3, offset: 9 }}>
                            <SearchTicket/>
                        </Col>
                    </Row>
                    <MainTable/>
                    <Row>
                        <Col md={{ size: 4, offset: 8 }}>
                            <Pagination/>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;