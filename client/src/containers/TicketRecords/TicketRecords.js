import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Row, Col } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

import AddTicket from '../../components/TicketRecords/AddTicket';
import MainTable from '../../components/TicketRecords/MainTable';
import Pagination from '../../components/TicketRecords/Pagination';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 3000 });

class TicketRecords extends Component {
    state = {
        ticket_id: '',
        tickets: [],
        currentPage: 1,
        ticketsPerPage: 10
    }

    componentDidMount () {
        axios.get('/tickets')
        .then(response => {
            this.setState({ tickets: response.data })

            console.log(this.state.tickets)
        })
        .catch(err => {
            console.log(err)
        });
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

    handlePaginationClick = (event) => {
        this.setState({ currentPage: Number(event.target.id) })
    }

    handlePaginationNext = () => {
        const nextPage = this.state.currentPage + 1;
        this.setState({ currentPage: Number(nextPage) })
    }

    handlePaginationPre = () => {
        const prevPage = this.state.currentPage - 1;
        this.setState({ currentPage: Number(prevPage) })
    }
    
    render() {

        const { tickets, currentPage, ticketsPerPage } = this.state;

        const indexOfLastTicket = currentPage * ticketsPerPage;
        const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
        const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++) {
            pageNumbers.push(i);
        }

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
                    <Row>
                        <Col md={{ size: 6, offset: 6 }}>
                            <Pagination
                                clickPage={this.handlePaginationClick}
                                clickNext={this.handlePaginationNext}
                                clickPrev={this.handlePaginationPre}
                                pageNumbers={pageNumbers}
                                currentPage={this.state.currentPage}
                            />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;