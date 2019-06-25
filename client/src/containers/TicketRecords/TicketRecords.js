import React, { Component } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';

import AddTicket from '../../components/TicketRecords/AddTicket';
import TicketRecordsTable from '../../components/TicketRecords/TicketRecordsTable';

import 'react-toastify/dist/ReactToastify.css';

toast.configure({ autoClose: 3000 });

class TicketRecords extends Component {
    state = {
        ticket_id: '',
        tickets: []
    }

    componentDidMount () {
        this.interval = setInterval(() => {
            axios.get('/tickets')
            .then(response => {
                this.setState({ tickets: response.data })
            })
            .catch(err => {
                console.log(err)
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                    <span>Ticket Records</span>
                    <div className="card-header-actions">
                        <AddTicket change={this.handleChange} value={this.state.ticket_id} click={this.handleClick} />
                    </div>
                </CardHeader>
                <CardBody>
                    {this.state.tickets.length > 0 ?
                        <TicketRecordsTable tickets={this.state.tickets} />
                        :
                        <BeatLoader color="#c8ced3" size={15} sizeUnit="px" css={{ textAlign: 'center', maxHeight: '19px' }} />
                    }
                    
                </CardBody>
            </Card>
        )
    }
}

export default TicketRecords;