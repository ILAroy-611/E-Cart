import { useEffect, useState } from "react";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import { Skeleton } from "antd";
import SCInput from "../../../Components/sc-input/SCInput";
import { useFormik } from "formik";
import { FaSearch } from "react-icons/fa";
import SCPagination from "../../../Components/pagination/SCPagination";
import { UserCard } from "../../../Components/card";
import "./displayuser.css";


function DisplayUser() {
  const { fetchAllUsers } = useAdminPriv();
  const [paginationInfo, setPaginationInfo] = useState({
    offset: 0,
    totalUsers: 0,
    usersArray: [],
    totalNumberofPages: 0,
    usersPerPage: 6,
    currentPageUsers: [],
  });

  const handleSetCurrentUsers = (offset) => {
    const currentUsers = paginationInfo.usersArray.slice(
      offset,
      offset + paginationInfo.usersPerPage
    );
    // console.log(currentUsers);
    setPaginationInfo({
      ...paginationInfo,
      offset,
      currentPageUsers: currentUsers,
    });
  };

  const handlePageChange = (pageNumber) => {
    // console.log(pageNumber);
    const offset = (pageNumber - 1) * paginationInfo.usersPerPage;
    handleSetCurrentUsers(offset);
  };

  const formik = useFormik({
    initialValues: {
      searchWord: "",
    },
    // validationSchema:"",
    onSubmit: () => {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const { total, userList } = await fetchAllUsers();
        // filetredArray= filetring(userList, searchWord)
        setLoading(false);
        setPaginationInfo({
          ...paginationInfo,
          totalUsers: total,
          usersArray: userList,
          totalNumberofPages: Math.ceil(total / paginationInfo.usersPerPage),
          currentPageUsers:userList.slice(0,paginationInfo.usersPerPage)
        });
        
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsers();
  }, []);
//   console.log(paginationInfo, loading);
  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="display-user-container">
          <div className="flex">
            <SCInput
              type="search"
              name="searchWord"
              placeholder="Search user here"
              formik={formik}
              id="search"
            />
            <FaSearch className="cart-search-icon" />
          </div>
          <div className="users-display-grid flex">
          {paginationInfo.currentPageUsers.map(ele=>{
            return(<UserCard userDetail={ele} key={ele._id}/>)
          })}
          </div>
          {paginationInfo.totalNumberofPages > 1 && (
            <SCPagination
              totalElements={paginationInfo.totalUsers}
              elementsPerPage={paginationInfo.usersPerPage}
              onChangeHandler={handlePageChange}
            />
          )}
        </div>
      )}
    </>
  );
}

export default DisplayUser;
