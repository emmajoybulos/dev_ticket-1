import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

const fullCalendar = (props) => {

    const events = [
        {
            title: 'event 1',
            start: '2019-06-18',
            imageurl: 'https://via.placeholder.com/150'
        },
        { 
            title: 'event 2', 
            start: '2019-06-19',
            imageurl: 'https://via.placeholder.com/150'
        }
    ];

    const options = {
        defaultView: 'dayGridMonth',
        plugins: [dayGridPlugin],
        events: events,
        eventRender: (event) => {
            const imageurl = event.event._def.extendedProps.imageurl, title = event.event._def.title, el = event.el;

            const content = (
                <React.Fragment>
                    <div className="fc-content">
                        <img src={imageurl} alt="User" /> {title}
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