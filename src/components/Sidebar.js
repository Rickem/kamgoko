import { IconContext } from "react-icons"
import { BsFillGridFill, BsShieldCheck, BsFillBellFill } from "react-icons/bs"
import { HiUsers } from "react-icons/hi"
import { FiBarChart2 } from "react-icons/fi"
import { AiFillFileAdd  } from "react-icons/ai"
import { ImBooks } from "react-icons/im"
import { IoIosArrowForward } from "react-icons/io"
import { Button } from "react-bootstrap"

function Sidebar() {
  // const [active, setActive] = useState(false);

  return (
    <IconContext.Provider value={{ color: "#B5B5C3", size: "1.5em", }}>
      <div className="row">
        <div className="col-2">
          <div className="sidebar">
            <div className="icons-start d-flex flex-column align-items-center">
              <div className="sidebar-icon icon-active">
                <BsFillGridFill />
              </div>
              
              <div className="sidebar-icon">
                <HiUsers />
              </div>
              <div className="sidebar-icon">
                <FiBarChart2 />
              </div>
              <div className="sidebar-icon">
                <BsShieldCheck />
              </div>
              <div className="sidebar-icon">
                <ImBooks />
              </div>
              <div className="sidebar-icon">
                <AiFillFileAdd />
              </div>
            </div>

            <div className="d-flex flex-column align-items-center">
              <div className="sidebar-icon position-relative">
                <BsFillBellFill />
                <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                  <span class="visually-hidden">6</span>
                </span>
              </div>
              <div className="avatar-bg p-3 mt-2 rounded-circle d-flex align-items-center justify-content-center">
                <img src="https://cdn.pixabay.com/photo/2021/05/10/08/00/woman-6242836_960_720.png" alt="user" className="avatar-img rounded-circle" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-10">
          <div className="p-4">
            <h4 className="text-dark mt-3">Comptes</h4>
            <div className="d-flex flex-column vh-100">
              <div className="flex-grow-1">
                <a className="sidemenu-item sidemenu-item-active" href="/">
                  Dashboard
                  <IoIosArrowForward />
                </a>
                <a className="sidemenu-item" href="/">
                  Sections
                  <IoIosArrowForward />
                </a>
                <a className="sidemenu-item" href="/">
                  Categories
                  <IoIosArrowForward />
                </a>
                <a className="sidemenu-item" href="/">
                  Labels
                  <IoIosArrowForward />
                </a>
                <a className="sidemenu-item" href="/">
                  Rôles
                  <IoIosArrowForward />
                </a>
              </div>
              <div>

              <Button className="w-100" variant="primary">Ajouter utilisateur</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default Sidebar
