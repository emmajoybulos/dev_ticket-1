import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';
import axios from 'axios';

import FullCalendar from '../../components/Calendar/FullCalendar';

class Calendar extends Component {

    state = {
        issues: []
    }

    componentDidMount () {
        axios.get('/calendar')
            .then(response => {
                this.setState({ issues: response.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        let recievedIssues = [], issues = [];

        const checkObject = (obj, arr) => {
            let i;
            for (i = 0; i < arr.length; i++) {
                if(arr[i].id == obj.id && arr[i].start == obj.start) {
                    return true;
                }
            }
            return false;
        }
        
        const getObj = (obj, arr) => {
            let i;
            for (i = 0; i < arr.length; i++) {
                if(arr[i].id == obj.id && arr[i].start == obj.start) {
                    return i;
                }
            }
            return false;
        }

        if(this.state.issues.issues) {
            recievedIssues = this.state.issues.issues.map((issue) => {
                return (
                    {
                        key: issue.key,
                        username: issue.fields.assignee.key,
                        displayName: issue.fields.assignee.displayName,
                        duedate: issue.fields.duedate,
                        imageurl: issue.fields.assignee.avatarUrls['24x24']
                    }
                )
            })
        }
        
        recievedIssues.map((recievedIssue) => {
            if(checkObject({ id: recievedIssue.username, start: recievedIssue.duedate }, issues)) {
                let i = getObj({ id: recievedIssue.username, start: recievedIssue.duedate }, issues);
                issues[i].count = issues[i].count + 1;
            } else {
                issues.push(
                    {
                        id: recievedIssue.username,
                        title: recievedIssue.displayName,
                        start: recievedIssue.duedate,
                        imageurl: recievedIssue.imageurl,
                        count: 1
                    }
                )
            }
        })

        return(
            <Card>
                <CardBody>
                    {issues.length > 0 &&
                        <FullCalendar issues={issues} />
                    }
                </CardBody>
            </Card>
            
        )
    }
}

export default Calendar