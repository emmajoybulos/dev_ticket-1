import React from 'react';
import { MDBDataTable } from 'mdbreact';

const data = {
    columns: [
      {
        label: 'Ticket ID',
        field: 'ticket_id',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Summary',
        field: 'ticket_summary',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Duedate',
        field: 'duedate',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Original Duedate',
        field: 'original_duedate',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Logged Time',
        field: 'logged_time',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'ticket_status',
        sort: 'asc',
        width: 100
      }
    ],
    rows: [
      {
        ticket_id: 'CRE-00001',
        ticket_summary: 'System Architect',
        duedate: '01/01/2019',
        original_duedate: '01/01/2019',
        logged_time: '5m',
        ticket_status: 'New'
      },
      {
        ticket_id: 'CRE-00002',
        ticket_summary: 'Accountant',
        duedate: '01/02/2019',
        original_duedate: '01/02/2019',
        logged_time: '10m',
        ticket_status: 'New'
      },
    ]
  };

const ticketRecordsTable = () => (
    <MDBDataTable
      striped
      bordered
      hover
      data={data}
    />
)

export default ticketRecordsTable