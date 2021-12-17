import { IconContext } from "react-icons"
import { BsFillGridFill, BsShieldCheck } from "react-icons/bs"
import { HiUsers } from "react-icons/hi"
import { FiBarChart2 } from "react-icons/fi"
import { AiFillFileAdd  } from "react-icons/ai"
import { ImBooks } from "react-icons/im"
import { IoIosArrowForward } from "react-icons/io"

function Sidebar() {
  // const [active, setActive] = useState(false);

  return (
    <IconContext.Provider value={{ color: "#B5B5C3", size: "1.5em", }}>
      <div className="row">
        <div className="col-2">
          <div className="sidebar">
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
        </div>
        <div className="col-10">
          <div className="p-4">
            <h4 className="text-dark mt-3">Comptes</h4>
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
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default Sidebar
