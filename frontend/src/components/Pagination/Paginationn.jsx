import React from 'react'
import { Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllBlog } from '../../Actions/Blogs';

const Paginationn = ({numberOfPages, search, sort}) => {
  const dispatch = useDispatch();
  const handlePages = (pageNumber) => {
    dispatch(getAllBlog(search, sort, pageNumber));
  }

  return (
    <div className="paginationBlock">
        <Pagination total={numberOfPages * 10} onChange={handlePages} />
    </div>
  )
}

export default Paginationn;