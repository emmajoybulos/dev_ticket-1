import React from "react";
import { Table, Badge } from "reactstrap";

const statusBadge = arg => {
  let status = null;
  switch (arg) {
    case "New":
    case "Reopened":
    case "On Hold":
      status = <Badge color="primary">{arg}</Badge>;
      break;
    case "Resolved":
    case "Subtask Completed":
      status = <Badge color="success">{arg}</Badge>;
      break;
    default:
      status = <Badge color="warning">{arg}</Badge>;
  }

  return status;
};

const mainTable = props => {
  let { currentTickets } = props;

  let renderTickets = <tr align="center"><td colSpan="6">Loading tickets...</td></tr>
      
  if(currentTickets.length > 0) {
  renderTickets = currentTickets.map((ticket) => 
      <tr key={ticket._id}>
          <td><a href={"https://jira.egalacoral.com/browse/" + ticket.ticket_id} target="_blank" rel="noopener noreferrer">{ticket.ticket_id}</a></td>
          <td><a href={"https://jira.egalacoral.com/browse/" + ticket.ticket_id} target="_blank" rel="noopener noreferrer">{ticket.ticket_summary}</a></td>
          <td>{ticket.duedate}</td>
          <td>{ticket.original_duedate}</td>
          <td>{ticket.logged_time}</td>
          <td>{statusBadge(ticket.ticket_status)}</td>
      </tr>
    )
  }

  return (
    <Table responsive bordered striped>
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Summary</th>
          <th>Duedate</th>
          <th>Original Duedate</th>
          <th>Logged Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>{renderTickets}</tbody>
    </Table>
  )
}

export default mainTable;
