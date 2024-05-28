import React, { Fragment, useMemo, useCallback } from 'react'
import { Stack, Grid, Typography, Box, TextField, Button, Tooltip, IconButton } from "@mui/material";
import { Calendar, momentLocalizer, Views, DateLocalizer } from 'react-big-calendar'
import moment from 'moment' // phân tích cú pháp giày giờ
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PropTypes from 'prop-types'
import backgroundEvents from './resources/backgroundEvents';
import * as dates from './utils/dates'
import events from './resources/events';

const mLocalizer = momentLocalizer(moment)
// Thiết lập màu 
const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

// 1 mảng chứa tất cả các giá trị của đối tượng có Views
let allViews = Object.keys(Views).map((k) => Views[k]);

export default function CalendarTable({
  localizer = mLocalizer,
  // showDemoLink = true,
  ...props
}) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2023, 3, 1),
      max: dates.add(dates.endOf(new Date(2023, 17, 1), 'day'), -1, 'hours'),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    []
  )
  // gọi sự kiện alert title
  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  )

  return (
    <Stack
      spacing={3}
      sx={{
        margin: "30px 0px",
      }}
    >
      <Fragment>
        <div className="myCustomHeight" style={{ width: "100%", height: "800px" }}>
          <Calendar
            backgroundEvents={backgroundEvents}
            dayLayoutAlgorithm="no-overlap" // bố chí tránh chồng chéo lên nhau khi lịch cùng thời gian
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.DAY}
            events={events}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={(events) => {
              const backgroundColor = events.colorEvento ? events.colorEvento : '#0c4da2';
              const color = events.color ? events.color : 'white';
              return { style: { backgroundColor, color } }
            }}
            max={max}
            showMultiDayTimes // hiển thị thời gian cho các sự kiện nhiều ngày
            step={60} // xác định số phút trong mỗi khoảng thời gian trên lưới lịch
            views={allViews} // tùy chỉnh chế độ xem
          />
        </div>
      </Fragment>

    </Stack>
  );
}