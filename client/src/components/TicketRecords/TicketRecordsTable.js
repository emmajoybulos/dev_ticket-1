import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const data = [
    {
        'ticket_id': '1',
        'ticket_summary': 'Summary',
        'duedate': '01/01/2019',
        'original_duedate': '01/01/2019',
        'logged_time': '5m',
        'ticket_status': 'New'
    },
    {
        'ticket_id': '2',
        'ticket_summary': 'Summary',
        'duedate': '01/02/2019',
        'original_duedate': '01/02/2019',
        'logged_time': '10m',
        'ticket_status': 'New'
    }
]

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
        Showing {from} to {to} of {size} Results
    </span>
)

const options = {
    showTotal: false
}

const columns = [
    {
        dataField: 'ticket_id',
        text: 'Ticket ID',
    },
    {
        dataField: 'ticket_summary',
        text: 'Summary'
    },
    {
        dataField: 'duedate',
        text: 'Duedata'
    },
    {
        dataField: 'original_duedate',
        text: 'Original Duedate',
        sort: true
    },
    {
        dataField: 'logged_time',
        text: 'Logged time',
        sort: true
    },
    {
        dataField: 'ticket_status',
        text: 'Status'
    }
]

const ticketRecordsTable = () => (
    <BootstrapTable
        keyField='ticket_id'
        data={data}
        columns={columns}
        pagination={paginationFactory(options)}
    />
)

export default ticketRecordsTable