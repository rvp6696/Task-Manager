
import { Link } from "react-router-dom"

let Header = () => {

    return (
        <div className="container-fluid" id="header-part">
            <div className="row">
                <div className="navbar-data">
                    <div className="mt-3 mb-3">
                        <img src="pagelogo.png" height="50" />
                    </div>

                    <div className="nav-section">
                        <ul className="pt-2">
                            <li>
                                <Link className="navlinks" to="/alltasks"> <i className="fa-solid fa-list-check"></i> All Tasks </Link>
                            </li>

                            <li>
                                <Link className="navlinks" to="/"> <i className="fa-solid fa-pen-nib"></i> New Task </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header