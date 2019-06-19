import React from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

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

const fullCalendar = (props) => {

    let recievedIssues = [];

    if (props.issues) {
        recievedIssues = props.issues.map((issue) => {
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

    let issues = [];
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

    const options = {
        defaultView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: issues,
        eventRender: (event) => {
            const imageurl = event.event._def.extendedProps.imageurl, title = event.event._def.title, el = event.el, count = event.event._def.extendedProps.count;

            const content = (
                <React.Fragment>
                    <div className="fc-content">
                        <img src={imageurl} alt="User" /> {title} - {count}
                    </div>
                </React.Fragment>
            )

            ReactDOM.render(content, el);
            return el;
        },
        eventClick: (event) => {
            console.log(event)
        }
    }

    return (
        <FullCalendar
            {...options}
        />
    )
}

export default fullCalendar;