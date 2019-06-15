const express = require('express');
const router = express.Router();
const JiraClient = require('jira-connector');

const Ticket = require('../../models/Ticket');

let jira = new JiraClient({
    host: 'jira.egalacoral.com',
    basic_auth: {
        base64: 'cmVtby5sYWxhdGE6UGFzc3dvcmQxMjMkJA=='
    }
})

router.get('/', (req,res) => {

});

router.post('/', (req, res) => {
    let ticket_id = req.body.ticket_id;

    jira.issue.getIssue({
        issueKey: ticket_id
    })
    .then(issue => {
        let ticket = new Ticket({
            ticket_id: issue.key,
            ticket_summary: issue.fields.summary,
            duedate: issue.fields.duedate,
            original_duedate: issue.fields.customfield_18301,
            logged_time: '5m',
            ticket_status: 'New'
        });

        ticket.save((err) => {
            if (err) return handleError(err);

            res.send('Saved!');
        })
    })
    .catch(err => {
        res.send(err)
    })
});

module.exports = router;