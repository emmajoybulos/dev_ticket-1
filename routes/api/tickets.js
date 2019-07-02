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
    Ticket.find({}).sort({ duedate: 'desc' })
    .then(tickets => {
        res.json(tickets);
    })
    .catch(err => {
        res.send(err)
    })
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
            logged_time: Math.floor(issue.fields.timespent / 60) + 'm',
            ticket_status: issue.fields.status.name
        });

        ticket.save()
        .then(() => {
            res.send('Saved!');
        })
        .catch(err => {
            res.send(err)
        })

    })
    .catch(err => {
        res.send(err)
    })
});

router.get('/show', (req, res) => {
    jira.search.search({
        jql: "(cf[21600]['key'] in (remo.lalata) OR cf[19613]['key'] in (remo.lalata) OR worklogAuthor in (remo.lalata))",
        maxResults: 5000,
        fields: ["key", "duedate", "assignee", "customfield_18301", "timespent", "status", "summary"]
    })
    .then(issues => {
        let ticket = [];

        issues.issues.map((issue) => {
            ticket.push(
                {
                    ticket_id: issue.key,
                    ticket_summary: issue.fields.summary,
                    duedate: issue.fields.duedate,
                    original_duedate: issue.fields.customfield_18301,
                    logged_time: Math.floor(issue.fields.timespent / 60) + 'm',
                    ticket_status: issue.fields.status.name
                }
            )
        });

        Ticket.insertMany(ticket)
        .then(response => {
            res.send('Saved!')
        })
        .catch(err => {
            res.send(err)
        })
    });
})

module.exports = router;