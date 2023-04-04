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

  const searchUser =(userList, searchWord)=>{
    console.log(userList,searchWord)
    if(searchWord!=""){
      const filteredArray= userList.filter(ele=>Object.values(ele).includes(searchWord))
      return filteredArray;
    }
    else{
      return userList
    }
  };

  const handleSearchUser=(userList, searchWord)=>{
    const response = searchUser(userList, searchWord);
    console.log('in search',response)
    setPaginationInfo({...paginationInfo, currentPageUsers: response})
  }

  const formik = useFormik({
    initialValues: {
      searchWord: "",
    },
    // validationSchema:"",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const { total, userList } = await fetchAllUsers();
        // filetredArray= filetring()
        const response = searchUser(userList, formik.values.searchWord);
        console.log('is effect',response)
        setLoading(false);
        setPaginationInfo({
          ...paginationInfo,
          totalUsers: total,
          usersArray: response,
          totalNumberofPages: Math.ceil(total / paginationInfo.usersPerPage),
          currentPageUsers:response.slice(0,paginationInfo.usersPerPage)
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
            <FaSearch className="cart-search-icon" onClick={()=>handleSearchUser(paginationInfo.usersArray,formik.values.searchWord)}/>
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
