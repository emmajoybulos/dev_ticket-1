import React from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

const fullCalendar = (props) => {

    if(props.issues) {
        const options = {
            defaultView: 'dayGridMonth',
            plugins: [dayGridPlugin],
            events: props.issues,
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
    }

    return (
        <FullCalendar
            {...options}
        />
    )
}

export default fullCalendar;