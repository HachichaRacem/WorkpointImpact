import {ArrowLeftLine, ArrowRightLine, FileUpload } from "@rsuite/icons"
import React from "react"
import {useState } from "react"
import { Button, IconButton, SelectPicker } from "rsuite"

const CalendarHeader = ({refs}) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December']
    const [title, setTitle] = useState(months[new Date().getMonth()] + ' ' + new Date().getFullYear())

    const nextHandle = () => {
        refs.current.getApi().next()
        setTitle(refs.current.getApi().currentDataManager.data.viewTitle)
    }
    const prevHandle = () => {
        refs.current.getApi().prev()
        setTitle(refs.current.getApi().currentDataManager.data.viewTitle)
    }
    const monthHandle = () => {
        refs.current.getApi().changeView("dayGridMonth")
        setTitle(refs.current.getApi().currentDataManager.data.viewTitle)
    }
    const weekHandle = () => {
        refs.current.getApi().changeView("timeGridWeek")
        setTitle(refs.current.getApi().currentDataManager.data.viewTitle)
    }
    const dayHandle = () => {
        refs.current.getApi().changeView("timeGridDay")
        setTitle(refs.current.getApi().currentDataManager.data.viewTitle)
    }
    const data = ['Member X', 'Member Y', 'Member Z'].map(
        item => ({ label: item, value: item })
      );
    return (
        <div>
           
            <div style={{display:'flex', justifyContent: 'space-between',  paddingBottom: 20, paddingTop: 5}}>
                <div style={{display: 'flex'}}>
                    <div>
                        <IconButton icon={<ArrowLeftLine/>} onClick={() => prevHandle()} size="lg" />
                        <IconButton icon={<ArrowRightLine/>} onClick={() => nextHandle()} size="lg" />
                    </div>
                    <SelectPicker placeholder='Select member' size='md' defaultValue='Member X' data={data} style={{ width: 180, paddingLeft: 20, paddingTop: 3}} />
                </div>
                <h3 style={{textAlign: "center", paddingRight: 100}} id="title">{title}</h3>
                <div>
                    <Button onClick={() => monthHandle()}>Month</Button>
                    <Button onClick={() => weekHandle()}>Week</Button>
                    <Button onClick={() => dayHandle()}>Day</Button>
                </div>
            </div>
        </div>
    )
}

export default CalendarHeader