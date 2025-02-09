import React from 'react'
import PaginateControls from './PaginateControls';
import Thumbnail from './Thumbnail';
import "../styles/pagination.css"

/**
 * Given any list of input children, paginate it to 
 * a fixed number of items per page
 * @param {*} params
 * @returns 
 */
export default function PaginationComponent({ page, data }) {
  const pageSize = 10; // number of items per page

  const startPage = (page-1) * pageSize;
  const endPage = startPage + pageSize;
  const entries = data.slice(startPage, endPage);

  return (
    <div className="pageVertical">
      <div className="pageGrid">
        {entries.map((product) => {
          return (<Thumbnail key={product.id} product={product} />)
        })}
      </div>
      <PaginateControls 
        pageSize={pageSize}
        maxItems={data.length}
        hasPrevPage={startPage > 0} 
        hasNextPage={endPage < data.length} 
      />
    </div>
  )
}
