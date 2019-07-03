const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
    ticket_id: {
        type: String,
        
    },
    ticket_summary: {
        type: String,
        
    },
    duedate: {
        type: String,
        
    },
    original_duedate: {
        type: String,
        
    },
    logged_time: {
        type: String,
        
    },
    ticket_status: {
        type: String,
        
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);