// search by name-
export function searchByName(searchList, searchedName) {
  if (searchedName!== "") {
    const filteredArray = searchList.filter((ele) => ele?.name.split(" ").includes(searchedName) ?? ele?.username.split(" ").includes(searchedName));
    return filteredArray;
  } else {
    return searchList;
  }
}

export function searchByEmail(searchList, searchedEmail) {
    if (searchedEmail!== "") {
        const filteredArray= searchList.filter(ele=>ele?.email===searchedEmail)
      return filteredArray;
    } else {
      return searchList;
    }
  }
