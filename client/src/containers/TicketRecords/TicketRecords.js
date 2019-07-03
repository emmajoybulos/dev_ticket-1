import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import AddTicket from '../../components/TicketRecords/AddTicket';
import MainTable from '../../components/TicketRecords/MainTable';
import Pagination from '../../components/TicketRecords/Pagination';
import InfoLabel from '../../components/TicketRecords/InfoLabel';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 3000 });

class TicketRecords extends Component {
    state = {
        ticket_id: '',
        tickets: [],
        currentTickets: [],
        currentPage: null,
        totalPages: null
    }

    componentDidMount () {
        axios.get('/tickets')
        .then(response => {
            this.setState({ tickets: response.data });
        })
        .catch(err => {
            console.log(err)
        });

        setInterval(() => {
            console.log('haha')
        }, 5000);
    }

    handleChange = (event) => {
        this.setState({ ticket_id: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/tickets', {
            ticket_id: this.state.ticket_id
        })
        .then(() => {
            this.setState({ ticket_id: '' });
            toast.success("Ticket saved!");

            axios.get('/tickets').then(response => { this.setState({ tickets: response.data }) })
        })
        .catch(err => {
            console.log(err)
        })
    }

    handlePageChanged = data => {
        const { tickets } = this.state;
        const { currentPage, totalPages, pageLimit } = data;

        const offset = (currentPage - 1) * pageLimit;
        const currentTickets = tickets.slice(offset, offset + pageLimit);

        this.setState({ currentPage, currentTickets, totalPages });
    }
    
    render() {

        const {
            tickets,
            currentTickets,
            currentPage,
            totalPages
        } = this.state;

        const totalTickets = tickets.length;
        
        return (

            <Card>
                <CardHeader>
                    <span>Ticket Records</span>
                    <div className="card-header-actions">
                        <AddTicket change={this.handleChange} value={this.state.ticket_id} submit={this.handleSubmit} />
                    </div>
                </CardHeader>
                <CardBody>
                    <MainTable currentTickets={currentTickets} />
                    {totalTickets > 0 &&
                        <Row>
                            <Col md="6">
                                <InfoLabel
                                    totalTickets={totalTickets}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                />
                            </Col>
                            <Col md="6">
                                <Pagination
                                    totalTickets={totalTickets}
                                    pageLimit={10}
                                    pageNeighbours={1}
                                    handlePageChanged={this.handlePageChanged}
                                />
                            </Col>
                        </Row>
                    }
                    
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;