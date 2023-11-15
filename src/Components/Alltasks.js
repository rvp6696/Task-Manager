
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import swal from "sweetalert"
import gsap from "gsap"

let Taskbucket = () => {

    let [taskinfo, updatetaskinfo] = useState([])

    let allTasks = () => {

        let url = "https://task-manager-wuiz.onrender.com/tasks"   // API 

        fetch(url)
            .then(response => response.json())
            .then(alltaskinfo => {
                if (alltaskinfo.length > 0) {
                    updatetaskinfo(alltaskinfo.sort((a, b) => new Date(a.taskdate) - new Date(b.taskdate)))
                } else {
                    swal("Empty", "No tasks available, please create new one", "warning")
                    window.location.href = "#/"
                }
            })
    }

    let filtertasks = () => {
        let url = "https://task-manager-wuiz.onrender.com/tasks"  // API 

        fetch(url)
            .then(response => response.json())
            .then(alltaskinfo => {
                updatefiltered(alltaskinfo[0])
            })
    }

    let updatestatusinfo = (statusname) =>{
        let url = "https://task-manager-wuiz.onrender.com/tasks?taskstatus=" + statusname     // API 

        fetch(url)
            .then(response => response.json())
            .then(taskinfo => {
                    updatetaskinfo(taskinfo.sort((a, b) => new Date(a.taskdate) - new Date(b.taskdate)))  
            })
    }

    let updatestatusinfoall = () => {
        allTasks()
    }

    useEffect(() => {
        allTasks()
        filtertasks()
        animate()
    }, [1])

    let [filtered, updatefiltered] = useState({})

    let taskdetails = (taskdata) => {
        updatefiltered(taskdata)
    }

    let [status, newstatus] = useState("")

    let updatestatus = (id) => {

        if (status == "") {
            swal("Oops", "Invalid Status Input Found", "error")
        } else {
            let url = "https://task-manager-wuiz.onrender.com/tasks/" + id     // API 

            let userinfo = {
                "taskstatus": status
            }

            let postdata = {
                headers: { 'Content-Type': 'application/json' },
                method: "PATCH",
                body: JSON.stringify(userinfo)
            }

            fetch(url, postdata)
                .then(response => response.json())
                .then(statusupdated => {
                    swal("Done", "Status Has been Updated !", "success")
                    allTasks()
                    newstatus("")
                })
        }
    }


    let deltask = (id) => {

        let url = "https://task-manager-wuiz.onrender.com/tasks/" + id    // API 

        let postdata = {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE",
        }

        fetch(url, postdata)
            .then(response => response.json())
            .then(statusupdated => {
                swal("Done", "Task has been deleted", "success")
                allTasks()
                filtertasks()
            })

    }


    let formatdate = (taskdate) => {
        let duedatedata = new Date(taskdate)
        let day = duedatedata.getDate()
        let month = duedatedata.getMonth()+1
        let year = duedatedata.getFullYear()

        return `${day}-${month}-${year}`
    }


    let animate = () => {

        gsap.from("#alltasks-table",{
            opacity:0,
            y: -200,
            duration:1.2,
            ease: "bounce"
        })  

        gsap.from(".card",{
            opacity:0,
            y: -200,
            duration:1.2,
            ease: "bounce"
        })
    }

    return (
        <div className="container">
            <div className="col-lg-12 row mt-3 ps-3 pe-3">
                <div className="col-lg-6">
                    <h2 className="text-center mb-3"> <i className="fa-solid fa-box-archive"></i> All tasks </h2>

                    <div className="text-center mb-2">
                        <label><input type="radio" name="task-category" className="ms-3" onClick={updatestatusinfoall} /> ALL </label>
                        <label><input type="radio" name="task-category" className="ms-3" onClick={updatestatusinfo.bind(this, "OPEN")} /> OPEN </label>
                        <label><input type="radio" name="task-category" className="ms-3" onClick={updatestatusinfo.bind(this, "IN-PROGRESS")} /> IN-PROGRESS </label>
                        <label><input type="radio" name="task-category" className="ms-3" onClick={updatestatusinfo.bind(this, "ON-HOLD")} /> ON-HOLD </label>
                        <label><input type="radio" name="task-category" className="ms-3" onClick={updatestatusinfo.bind(this, "COMPLETED")} /> COMPLETED </label>
                    </div>
                    <table className="table table-bordered table-hover p-3" id="alltasks-table">
                        <thead>
                            <tr>
                                <th>Due Date</th>
                                <th>Title</th>
                                <th>Priority</th>
                                <th>Current Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taskinfo.map((taskdata, index) => {
                                    return (
                                        <tr key={index} onClick={taskdetails.bind(this, taskdata)}>
                                            <td> {formatdate(taskdata.taskdate)} </td>
                                            <td> {taskdata.tasktitle} </td>
                                            <td> {taskdata.taskpriority} </td>
                                            <td> {taskdata.taskstatus} </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-6">
                    <h2 className="text-center mb-3"> <i className="fa-solid fa-circle-info"></i> Details </h2>

                    <div className="card text-dark bg-light mb-3">
                        <div className="card-header">
                            <h5 className="card-title">{filtered.tasktitle}</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text"><b>Task Id :</b> {filtered.id}</p>
                            <p className="card-text"><b>Title :</b> {filtered.tasktitle}</p>
                            <p className="card-text"><b>Priority :</b> {filtered.taskpriority}</p>
                            <p className="card-text"><b>Category :</b> {filtered.taskcategory}</p>
                            <p className="card-text"><b>Update Status :</b>
                                <select className="form-select-sm ms-3 rounded" value={status} onChange={e => newstatus(e.target.value)}>
                                    <option value="">Choose</option>
                                    <option value="OPEN">OPEN</option>
                                    <option value="IN-PROGRESS">IN-PROGRESS</option>
                                    <option value="ON-HOLD">ON-HOLD</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                </select>
                            </p>
                            <p className="card-text"><b>Due Date :</b> {formatdate(filtered.taskdate)}</p>
                            <p className="card-text"><b>Due Time :</b> {filtered.tasktime} IST</p>
                            <p className="card-text"><b>Description : </b> {filtered.taskdesc}</p>
                            <div className="text-center mt-2">
                                <button className="btn bg-success text-white normal-buttons" onClick={updatestatus.bind(this, filtered.id)}>Save</button>
                                <button className="btn bg-warning normal-buttons ms-3"> 
                                    <Link className="edit-link" to={`/edituser/${filtered.id}`}>Edit</Link>
                                </button>
                                <button className="btn bg-danger text-white normal-buttons ms-3" onClick={deltask.bind(this, filtered.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taskbucket