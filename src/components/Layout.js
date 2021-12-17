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
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-9">
          <main className="p-8 mt-5">
            <div className="page-title">
              <h4>Users List</h4>
              <p className="breadcumb d-flex align-items-center">
                <span>Home / </span>
                <span className='ml-1'>User management / </span>
                <span className='text-dark'> User List</span>
              </p>
            </div>

            <section>
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
              <table className="table">
                <thead>
                  <tr>
                    <th className='d-flex flex-row'>
                      <div class="custom-control custom-checkbox">
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
                          <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" />
                          </div>
                          <div className="d-flex flex-row align-items-center">
                            <img src="https://cdn.pixabay.com/photo/2021/05/10/08/00/woman-6242836_960_720.png" alt="user" className="avatar-img rounded-circle" />
                            <div className="user-info">
                              <h6>{user.name}</h6>
                              <p>{user.email}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>Role</td>
                      <td>Time ago</td>
                      <td>{user.status === "active" ? "Yes" : "No"}</td>
                      <td>05 May 2021</td>
                    </tr>
                  ))}
                </tbody>
              </table>

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
