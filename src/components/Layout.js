/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Sidebar from "./Sidebar"
import ReactPaginate from 'react-paginate';
import AddUser from './AddUser';

function Layout() {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  // Handle pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isLoaded, setisLoaded] = useState(false);
  const [filter, setFilter] = useState('');


  const URL = `https://gorest.co.in/public/v1/users?page=1${currentPage}`;

  const fetchUsers = async () => {
    const response = await fetch(URL);
    const result = await response.json();
    console.log(result.data);
    setUsers(result.data);
    setList(result.data);
    setPageCount(result.meta.pagination.pages);
    setisLoaded(true);
  }

  const handlePageClick = (data) => {
    let selected = data.selected + 1;
    setCurrentPage(selected);
    fetchUsers();
  }

  // search
  const handleFilter = (e) => {
    setFilter(e.target.value);
  }

  // add user
  const onUserAdded = () => {
    fetchUsers();
  }

  const getRoles = () =>{
    const roles = ["Super admin", "Manager", "Agent", "Analiste"];
    var random = Math.floor(Math.random()*roles.length);
    return roles[random];
  }

  const getTwoStep = () =>{
    const roles = ["Approved", "Declined", "In Progress", "In Transit"];
    var random = Math.floor(Math.random()*roles.length);
    return roles[random];
  }


  
  useEffect(() => {
    // fetch 500 users from https://gorest.co.in/public/v1/users?page=1
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      return user.name.toLowerCase().includes(filter.toLowerCase());
    });

    if (filter === '') {
      setUsers(list);
    } else {
      setUsers(filtered);
    }
  }, [filter, setFilter], );


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 vh-100">
          <Sidebar />
        </div>
        <div className="col-9 main-bg">
          <main className="p-8 mt-5">
            <div className="page-title mx-4">
              <h4>Users List</h4>
              {/* <p className="breadcumb d-flex align-items-center">
                <span>Home / </span>
                <span className='ml-1'>User management / </span>
                <span className='text-dark'> User List</span>
              </p> */}
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="/" className="text-decoration-none">Home</a></li>
                  <li class="breadcrumb-item"><a href="/" className="text-decoration-none">User management</a></li>
                  <li class="breadcrumb-item active text-dark" aria-current="page">User List</li>
                </ol>
              </nav>
            </div>
            

            <section className="m-4">
              <div className="d-flex flex-row justify-content-between mb-4">
                {/* Search box */}
                <div className="search-box">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search" 
                    onChange={handleFilter}
                  />
                </div>
                {/* Add new user */}
                <div className="add-new-user">
                  <AddUser onUserAdded={onUserAdded} />
                </div>
              </div>

              {/* Display users in a table with 20 items per row */}
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th className='d-flex flex-row'>
                        <div class="px-2">
                          <input type="checkbox" class="custom-control-input" />
                        </div>
                        USER
                      </th>
                      <th>ROLE</th>
                      <th>LAST LOGIN</th>
                      <th>TWO STEP</th>
                      <th>JOINED DATE</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="d-flex flex-row align-items-center">
                            <div class="mr-2 p-2">
                              <input type="checkbox" class="custom-control-input" />
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div className='position-relative mr-3'>
                                <img src="https://cdn.pixabay.com/photo/2021/05/10/08/00/woman-6242836_960_720.png" alt="user" className="avatar-img rounded-circle" />
                                <span class="position-absolute bottom-0 start-100 translate-middle p-1 badge-green border border-light rounded-circle">
                                  <span class="visually-hidden">Alerts</span>
                                </span>
                              </div>
                              <div className="user-info px-4">
                                <h6>{user.name}</h6>
                                <p className='text-muted'>{user.email}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='custom-bold'>{ getRoles() }</td>
                        <td>
                          <span className='gray-pill'>Time ago</span>
                        </td>
                        <td>
                          <TwoStepBox status={getTwoStep()} />
                        </td>
                        <td className='custom-bold'>05 May 2021</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}

            {isLoaded ? (
              <ReactPaginate
                pageCount={pageCount}
                pageRange={2}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                previousLinkClassName={'page-link'}
                breakClassName={'page'}
                nextLinkClassName={'page-link'}
                pageClassName={'page-link'}
                disabledClassName={'disabled'}
                activeClassName={'active'}
              />
            ) : (
              <div>No data</div>
            )}


            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout

function TwoStepBox({status}) {
  switch (status) {
    case "Approved":
      return <span className='success-pill'>{ status }</span>
    case "Declined":
      return <span className='danger-pill'>{ status }</span>
    case "In Progress":
      return <span className='info-pill'>{ status }</span>
    case "In Transit":
      return <span className='warning-pill'>{ status }</span>
    default:
      break;
  }
}