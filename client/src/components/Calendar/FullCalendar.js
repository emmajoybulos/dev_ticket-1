import React, { Component } from 'react';
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

    const recievedIssues = [
        {
            key: 'CRE-00001',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-19',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00002',
            username: 'julie.cabria',
            displayName: 'Julie Cabria',
            duedate: '2019-06-19',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00003',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-19',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00004',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-20',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00005',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-20',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00006',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-20',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00007',
            username: 'julie.cabria',
            displayName: 'Julie Cabria',
            duedate: '2019-06-20',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00008',
            username: 'julie.cabria',
            displayName: 'Julie Cabria',
            duedate: '2019-06-21',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00009',
            username: 'julie.cabria',
            displayName: 'Julie Cabria',
            duedate: '2019-06-21',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00010',
            username: 'julie.cabria',
            displayName: 'Julie Cabria',
            duedate: '2019-06-21',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00011',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-22',
            imageurl: 'https://via.placeholder.com/150'
        },
        {
            key: 'CRE-00012',
            username: 'remo.lalata',
            displayName: 'Remo Lalata',
            duedate: '2019-06-23',
            imageurl: 'https://via.placeholder.com/150'
        }
    ]

    let issues = [];
    recievedIssues.map((recievedIssue) => {
            if(checkObject({ id: recievedIssue.username, start: recievedIssue.duedate }, issues)) {
                let i = getObj({ id: recievedIssue.username, start: recievedIssue.duedate }, issues);
                // console.log(getObj({ id: recievedIssue.username, start: recievedIssue.duedate }, issues));
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
            console.log(event)
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