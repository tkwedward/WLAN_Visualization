let data = document.querySelector(".jsonData").innerText
data = JSON.parse(data)
let host = data["host"]
document.querySelector(".jsonData").style.display = "none"

let bodyWrapper = document.querySelector(".bodyWrapper")
let number_of_host = host.length


let header = "time"
let newRow = createNewRow(header)
bodyWrapper.append(newRow)

let eventsArray = data["data"]
// find out all the time
let time_array = new Set()
eventsArray.forEach(_event =>{
    time_array.add(_event.event_time)
})


// to create a time category array
let time_category = {}
time_array.forEach(_t=>{
    time_category[_t] = []
})

eventsArray.forEach((item, i) => {
    let _event_time = item.event_time
    time_category[_event_time].push(item)
});

// console.log(time_category)
Object.entries(time_category).forEach(item =>{
    let time = item[0]
    let _event_array = item[1]
    let newRow = createNewRow(time)

    let channel_status_array = []



    // event array of the time array
    _event_array.forEach(p=>{
        // the event block which will contains all the inner host block
        let eventBlock = createEventBlock()

        let eventResultText = generateEventText(time, p)
        // console.log(eventResultText)


        host.forEach((_h, i) => {
            // add information before render
            host_name = mapping[_h]
            // console.log(p.buffer_status[_h])
            let buffer_status = p.buffer_status[_h]
            k = buffer_status.split(", ")
            // console.log(k);


            eventResultText[host_name] = `(Event ${p.event_id}) ${name} ${status}<br>` + eventResultText[host_name]
            // document.body.innerHTML =
            // eventResultText[host_name] += p.buffer_status[host]
            eventResultText[host_name] += `Buffer: ${p.buffer_status[_h]}<br>`

            eventResultText[host_name] += `Counter: ${p.counter_status[_h]}<br>`

            eventResultText[host_name] += `processing: ${p.processing_dataframe[_h]}<br>`

            // add the text
            eventBlock.addEventDescription(host_name, eventResultText[host_name])


        });

        let event_list = p.event_list
        let event_list_block = document.createElement("div")
        event_list_block.classList.add("event_list_block")
        let event_list_text = ""
        console.log(p.event_list)
        p.event_list.forEach((_e, i) => {
            event_list_text += `${i} ${_e}<br>`
        });

        event_list_block.innerHTML = event_list_text

        newRow.addEventBlock(eventBlock)
        newRow.addEventBlock(event_list_block)


        channel_status_array.push([p.event_id, p.channel_status])
    }) // event for each of the time category



    // let channel_text = ""
    // channel_status_array.forEach(p=>{
    //     let event_id = p[0]
    //     let status = p[1]
    //     channel_text += `${event_id}: ${status} <br>`
    // })

    bodyWrapper.append(newRow)

})
