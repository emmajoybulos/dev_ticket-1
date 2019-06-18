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
    // jira.search.search({
    //     jql: "project = CRE AND assignee in (don.melendez, lester.duldulao, lunar.cuenca, remo.lalata, jessica.gunay, kevin.chavez, francheska.rivano, emma.bulos, john.bero, julie.cabria, arjimson.santiano, lloyd.montero, daryl.laraya, kristine.molina)",
    //     maxResults: 10
    // })
    //     .then(issues => {
    //         res.send(issues.key)
    //         // res.json({
    //         //     key: issues.issues.key
    //         // })
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
});

module.exports = router;