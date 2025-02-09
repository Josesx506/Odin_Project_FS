"use client"

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import "../styles/pagination.css"

/**
 * Pagination bar component. Shows first, prev, progress, next, last
 */
export default function PaginateControls({ hasPrevPage, hasNextPage, maxItems, pageSize=10 }) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const endPages = Math.ceil(maxItems/pageSize);

  let prevClsName = hasPrevPage ? "pgnBtn two" : "pgnBtn__prev--hidden"
  let nxtClsName = hasNextPage ? "pgnBtn four" : "pgnBtn__next--hidden"

  return (
    <div className="pagination">
      <button className="pgnBtn one">
        <Link href={`${path}?page=${1}`}>first</Link>
      </button>
      <button className={prevClsName} disabled={!hasPrevPage}>
        {hasPrevPage && <Link href={`${path}?page=${page-1}`}>prev</Link>}
      </button>
      
      <div className="pgn_status">{page} / {endPages}</div>
      
      <button className={nxtClsName}  disabled={!hasNextPage}>
        {hasNextPage && <Link href={`${path}?page=${page+1}`}>next</Link>}
      </button>
      <button className="pgnBtn five">
        <Link href={`${path}?page=${endPages}`}>last</Link>
      </button>
    </div>
  )
}
