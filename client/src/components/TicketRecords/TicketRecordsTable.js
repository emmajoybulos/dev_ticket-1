import React from 'react';
import { MDBDataTable } from 'mdbreact';

const ticketRecordsTable = (props) => {

    const assembledTickets = props.tickets.map((ticket) => {
        return (
            {
                ticket_id: ticket.ticket_id,
                ticket_summary: ticket.ticket_summary,
                duedate: ticket.duedate,
                orignal_duedate: ticket.original_duedate,
                logged_time: ticket.logged_time,
                ticket_status: ticket.ticket_status
            }
        )
    });

    const data = {
        columns: [
            {
                label: 'Ticket ID',
                field: 'ticet_id',
                sort: false
            },
            {
                label: 'Summary',
                field: 'ticket_summary',
                sort: false
            },
            {
                label: 'Duedate',
                field: 'duedate',
            },
            {
                label: 'Original Duedate',
                field: 'orignal_duedate',
                sort: false
            },
            {
                label: 'Logged Time',
                field: 'logged_time',
                sort: false
            },
            {
                label: 'Status',
                field: 'ticket_status',
                sort: false
            }
        ],
        rows: assembledTickets
    }

    return (
        <MDBDataTable
            striped
            bordered
            data={data}
            order={['duedate', 'desc']}
        />
    )
}

export default ticketRecordsTable