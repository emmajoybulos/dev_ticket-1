const express = require('express');
const router = express.Router();
const JiraClient = require('jira-connector');

let jira = new JiraClient({
    host: 'jira.egalacoral.com',
    basic_auth: {
        base64: 'cmVtby5sYWxhdGE6UGFzc3dvcmQxMjMkJA=='
    }
})

router.get('/', (req, res) => {
    jira.search.search({
        jql: "project = CRE AND status['id'] in (1, 3, 4) AND assignee in (don.melendez, lester.duldulao, lunar.cuenca, remo.lalata, jessica.gunay, kevin.chavez, francheska.rivano, emma.bulos, john.bero, julie.cabria, arjimson.santiano, lloyd.montero, daryl.laraya, kristine.molina)",
        maxResults: 5000,
        fields: ["key", "duedate", "assignee"]
    })
        .then(issues => {
            res.json(issues)
        })
        .catch(err => {
            res.send(err)
        })
});

module.exports = router;