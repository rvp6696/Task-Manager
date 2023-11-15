
import { useState, useEffect } from "react"
import swal from "sweetalert"
import gsap from "gsap"

let CreateTask = () => {

    let [title, updatetitle] = useState("")
    let [duedate, updatedate] = useState("")
    let [duetime, updatetime] = useState("")
    let [desc, updatedesc] = useState("")
    let [priority, updatepriority] = useState("")
    let [cat, updatecat] = useState("")
    let [status, updatestatus] = useState("")

    
    let sendinfo = (e) => {

        e.preventDefault()

        let task = {
            tasktitle: title,
            taskdate: duedate,
            tasktime: duetime,
            taskdesc: desc,
            taskpriority: priority,
            taskcategory: cat,
            taskstatus: status
        }

        let url = "https://task-manager-wuiz.onrender.com/tasks"     // API 

        let postdata = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(task)
        }

        fetch(url, postdata)
            .then(response => response.json())
            .then(taskdata => {
                console.log(taskdata)
                swal(taskdata.tasktitle, "has been saved !", "success")
            })

    }

    useEffect(()=>{
        animate()
    },[1])


    let animate = () => {

        gsap.from("#task-form",{
            opacity:0,
            y: 100,
            duration:1,
            ease: "cric"
        })

        gsap.from("#add-button",{
            opacity:0,
            y: -100,
            duration:1,
            ease: "cric"
        })
    }

    return (
        <div className="container-fluid ">
            <div className="row">
                <h1 className="text-center page-title">  <img src="createlogo.png" height="50" /> New Task Details </h1>


                <form className="row" onSubmit={sendinfo} id="task-form">
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                        <div className="mb-2">
                            <label>Title</label>
                            <input type="text" className="form-control normal-text" required onChange={e => updatetitle(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <label>Priority</label>
                            <select className="form-select normal-text" required onChange={e => updatepriority(e.target.value)}>
                                <option value="">Choose</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>


                        <div className="mb-2">
                            <label>Status</label>
                            <select className="form-select normal-text" required onChange={e => updatestatus(e.target.value)}>
                                <option value="">Choose</option>
                                <option value="OPEN">OPEN</option>
                                <option value="IN-PROGRESS">IN-PROGRESS</option>
                                <option value="ON-HOLD">ON-HOLD</option>
                                <option value="COMPLETED">COMPLETED</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-2">
                            <label>Due Date</label>
                            <input type="date" className="form-control normal-text" required onChange={e => updatedate(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <label>Due Time (IST)</label>
                            <input type="time" className="form-control normal-text" required onChange={e => updatetime(e.target.value)} />
                        </div>

                        <div className="mb-2">
                            <label>Category</label>
                            <select className="form-select normal-text" required onChange={e => updatecat(e.target.value)}>
                                <option value="">Choose</option>
                                <option value="Meetings">Meetings</option>
                                <option value="Reports">Reports</option>
                                <option value="Tasks">Tasks</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-8">
                        <label>Details</label>
                        <textarea className="form-control task-details normal-text" required onChange={e => updatedesc(e.target.value)}></textarea>
                    </div>
                    <div className="col-lg-2"></div>

                    <div className="col-lg-12 mt-4 text-center">
                        <button className="btn" id="add-button" type="submit"> Add Task </button>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateTask