let mapping = {
    "Host 0": "host_0",
    "Host 1": "host_1",
    "Host 2": "host_2"
}

function createNewRow(time){
    let row = document.createElement("div")
    let column_style = "15% "
    column_width = "85% "
    row.classList.add("row")



    let columnTime = document.createElement("div")
    columnTime.classList.add("time", "column")
    columnTime.innerHTML = time
    row.append(columnTime)

    let eventRow = document.createElement("div")
    eventRow.classList.add("eventRow", "column")

    row.append(eventRow)

    row.addEventBlock = function(div){
        eventRow.append(div)
    }



    // for (let i=0; i < n; i++){
    //     let column = document.createElement("div")
    //     column.classList.add(`host_${i}`, "column", "host")
    //     column.innerHTML = textArray[i+1]
    //     column_style += column_width
    //     row.append(column)
    // }
    //
    //
    // let columnChannel = document.createElement("div")
    // columnChannel.classList.add("channel", "column")
    // columnChannel.innerHTML = textArray[n+1]
    // column_style += column_width
    // row.append(columnChannel)
    return row
}



function createEventBlock(){
    // th block containing all the host information for each host
    // add the host block into the event block

    let eventBlock = document.createElement("div")
    eventBlock.classList.add("eventBlock")
    eventBlock.style.gridTemplateColumns = "1fr 1fr 1fr 1fr"


    host.forEach(h=>{
        // the inner event blck of each host
        let block = document.createElement("div")
        block.classList.add(`${mapping[h]}_event_block`, "inner_event_block")

        block.addText = function(text){
            block.innerHTML = text
        }
        host_name = mapping[h]
        eventBlock[host_name] = block
        eventBlock.append(block)
    })

    // eventBlock["firend"] =
    // console.log(eventBlock["firend"]);

    eventBlock.addEventDescription = function(host, text){
        // eventBlock.querySelector(host).innerHTML = text
        eventBlock[host].innerHTML = text

    }


    return eventBlock
}


function colorized(text, color="red"){
    return `<span style='color: ${color}'> ${text} </span>`

}


function generateEventText(time, p){

    let result_text = {
        "time": `${time}`,
        "host_0": "",
        "host_1": "",
        "host_2": "",
        "host_3": ""
    }


    if (p.event == "ScheduleDataFrameEvent"){
        let targetHost = mapping[p.origin]
        if (p.dataframe_type == "internal DF"){
            result_text[targetHost] += `<li>ScheduleDataFrameEvent: <b>${p.sender}</b> sends <b> ${p.dataframe_type}  (df ${p.dataframe_id})</b> to <b>${p.receiver}</b> at <b>${p.arrival_time}</b></li>`
        }

        if (p.dataframe_type == "external DF"){
            result_text[targetHost] += `<li>(Event ${p.event_id}) ScheduleDataFrameEvent: <b>${p.sender}</b> sends <b> ${p.dataframe_type}  (df ${p.dataframe_id})</b> to <b>${p.receiver}</b> at <b>${p.arrival_time}</b></li>`
        }

        if (p.dataframe_type == "ack"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) ScheduleDataFrameEvent: <b>${p.sender}</b> sends <b> ${p.dataframe_type}  (df ${p.dataframe_id})</b> to <b>${p.receiver}</b> at <b>${p.arrival_time}</b></li>`
        }
    }


    if (p.event == "ProcessDataFrameArrivalEvent"){
        let targetHost = mapping[p.origin]


        if (p.dataframe_type == "internal DF"){
            result_text[targetHost] += `<li>(Event ${p.event_id}) ProcessDataFrameArrivalEvent: Internal Dataframe <b>(df ${p.dataframe_id})</b> arrives. (${p.sender} -> ${p.receiver})</li>`
        }

        if (p.dataframe_type == "external DF"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) ProcessDataFrameArrivalEvent: External Frame <b> Dataframe ${p.dataframe_id} </b> from <b> ${p.sender}</b> to <b>${p.receiver} </b>  arrives. </li>`
        }

        if (p.dataframe_type == "ack"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) ProcessDataFrameArrivalEvent: ACK <b> Dataframe ${p.dataframe_id}</b> from ${p.receiver} to ${p.sender} arrives.</li>`
        }
        // result_text[targetHost] += `<li>(Event ${p.event_id}) Dataframe from ${p.sender} to ${p.receiver} reaches. </li>`
    }



    if (p.event == "SenseChannelEvent"){
        console.log(p.result);
        if (p.dataframe_type == "df, stage 0"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) SenseChannelEvent: ${colorized('(' + p.result + ')')} <b>Sense channel (df, stage 0)</b> for <b> df ${p.dataframe_id}</b>.</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

        if (p.dataframe_type == "df, stage 1"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) SenseChannelEvent: ${colorized('(' + p.result + ')')} <b>Sense channel (df, stage 1)</b> for <b> df ${p.dataframe_id}</b>.</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

        if (p.dataframe_type == "ack, stage 0"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) SenseChannelEvent: ${colorized('(' + p.result + ')')} <b>Sense channel (ack, stage 0)</b> for <b> df ${p.dataframe_id}</b>.</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

        if (p.dataframe_type == "ack, stage 1"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) SenseChannelEvent: ${colorized('(' + p.result + ')')} <b>Sense channel (ack, stage 1)</b> for <b> df ${p.dataframe_id}</b>.</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

    }


    if (p.event == "PushToChannelEvent"){
        let targetHost
        console.log(p);
        if (p.push_type == "push data to channel"){
            targetHost = mapping[p.sender]

            result_text[targetHost] += `<li>(Event ${p.event_id}) PushToChannelEvent: <b>Push df ${p.dataframe_id} to channel </b>  .</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

        if (p.push_type == "push ack to channel"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) PushToChannelEvent: <b>Push ack ${p.dataframe_id} to channel (${p.receiver}->${p.sender})</b>.</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }
    }

    if (p.event == "DepartureEvent"){

        let targetHost

        if (p.departure_type == "data"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) DepartureEvent: <b> dataframe ${p.dataframe_id} departs from channel to ${p.receiver}   </b>  .</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }

        if (p.departure_type == "ack"){
            targetHost = mapping[p.receiver]
            result_text[targetHost] += `<li>(Event ${p.event_id}) DepartureEvent: <b> ack ${p.dataframe_id} departs from channel to ${p.receiver}   </b>  .</li>`
            result_text[targetHost] += `- <span class="timer_info">${p.result_description}</span> <br><br>`
        }
    }

    if (p.event == "AckExpectedEvent"){
        let targetHost

        targetHost = mapping[p.sender]
        result_text[targetHost] += `<li>(Event ${p.event_id}) AckExpectedEvent: <b> ${p.sender} expecet <b> ack ${p.dataframe_id} </b> from ${p.receiver} at ${p.expected_time}</li><br>`
    }

    if (p.event == "SuccessTransferEvent"){
        let targetHost

        targetHost = mapping[p.sender]
        result_text[targetHost] += `<li>(Event ${p.event_id}) SuccessTransferEvent: <b> ${p.sender} expecet <b> ack ${p.dataframe_id} </b> from ${p.receiver} at ${p.event_time}</li><br>`
    }

    if (p.event == "AckResultEvent"){
        let targetHost

        if (p.result == "success"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) <b>${colorized('AckResultEvent: success transfer', "DarkOrange")}</b> <b>(dataframe ${p.dataframe_id})</b></li><br>`
        }

        if (p.result == "failure"){
            targetHost = mapping[p.sender]
            result_text[targetHost] += `<li>(Event ${p.event_id}) ${colorized('AckResultEvent: <b>Failure</b>, collision happens', 'Purple')} and set a <b>Timer ${p.dataframe_id} which will ring at ${p.counter_duration}</b> </li><br>`
        }

    }

    if (p.event == "TimeoutEvent"){

        let targetHost
        if (p.status == "deactivate"){
            targetHost = mapping[p.origin]
            result_text[targetHost] += `<li>(Event ${p.event_id}) <b>TimeoutEvent</b>: Timer ${p.dataframe_id} timesup but it is deactivated. Nothing will happen. </li><br>`
        }

        if (p.status == "activated"){
            targetHost = mapping[p.origin]
            result_text[targetHost] += `<li>(Event ${p.event_id}) <b>TimeoutEvent</b>: Timer ${p.dataframe_id} timesup. ${p.origin} is going to push the data to channel </li><br>`
        }


    }// TimeoutEvent

    return result_text
}
