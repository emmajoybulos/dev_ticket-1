const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    ticket_id: {
        type: String,
        required: true
    },
    ticket_summary: {
        type: String,
        required: true
    },
    duedate: {
        type: String,
        required: true
    },
    original_duedate: {
        type: String,
        required: true
    },
    logged_time: {
        type: String,
        required: true
    },
    ticket_status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);