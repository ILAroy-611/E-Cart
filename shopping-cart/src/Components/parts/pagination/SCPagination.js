import { Pagination } from "antd";
import "./pagination.css";


function SCPagination({totalElements, onChangeHandler, elementsPerPage}) {
  return (
    <Pagination
      defaultCurrent={1}
      total={totalElements}
      onChange={onChangeHandler}
      responsive
      pageSize={elementsPerPage}
      // current
      // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
    />
  );
}

export default SCPagination;
