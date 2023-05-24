import { useEffect, useState } from "react";
import useAdminPriv from "../../../Hooks/useAdminPriv";
import { Skeleton } from "antd";
import SCInput from "../../../Components/ui/sc-input";
import { useFormik } from "formik";
import { FaSearch } from "react-icons/fa";
import SCPagination from "../../../Components/parts/pagination";
import { UserCard } from "../../../Components/card";
import SCDropdown from "../../../Components/ui/dropdown";
import "./displayuser.css";
import { searchItems } from "./helper";

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

  const searchUser = (userList, searchWord) => {
    console.log(userList, searchWord);
    if (searchWord != "") {
      // const filteredArray= userList.filter(ele=>Object.values(ele).includes(searchWord))
      // console.log(userList[3]?.username.split(" "))
      const filteredArray = userList.filter((ele) => ele?.email === searchWord);
      return filteredArray;
    } else {
      return userList;
    }
  };

  const handleSearchUser = (userList, searchWord) => {
    const response = searchUser(userList, searchWord);
    console.log("in search", response);
    setPaginationInfo({ ...paginationInfo, currentPageUsers: response });
  };

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
        // console.log('is effect',response)
        setLoading(false);
        setPaginationInfo({
          ...paginationInfo,
          totalUsers: total,
          usersArray: response,
          totalNumberofPages: Math.ceil(total / paginationInfo.usersPerPage),
          currentPageUsers: response.slice(0, paginationInfo.usersPerPage),
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
          <div className="flex user-search-bar-flex">
            <SCDropdown
              placement="bottom"
              items={searchItems}
              mainEle={<div className="search-filter">Search By</div>}
            />
            <SCInput
              type="search"
              name="searchWord"
              placeholder="Search user by email"
              formik={formik}
              id="search"
            />
            <FaSearch
              className="cart-search-icon"
              onClick={() =>
                handleSearchUser(
                  paginationInfo.usersArray,
                  formik.values.searchWord
                )
              }
            />
          </div>
          <div className="users-display-grid flex">
            {paginationInfo.currentPageUsers.map((ele) => {
              return <UserCard userDetail={ele} key={ele._id} />;
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
