import { MessageSquare, SquarePen, Trash2, ListTodo } from 'lucide-react';
import Link from 'next/link';

export default function ViewCommentsBtn({commentId, numComments, className=''}) {
  return (
    <Link className={className} href={`/${commentId}#comments`}>
        <MessageSquare strokeWidth={"1.2px"} size={"1em"} fill='lightgray' />
        <div>{numComments}</div>
    </Link>
  )
}

export function EditPostBtn({postId, status="draft", className='', href='#'}) {
    return (
      <Link className={className} href={href}>
        {
          status==="draft" ? 
          <ListTodo color='rgb(39,100,200)' strokeWidth={"1.5px"} size={"1.2em"} /> : 
          <SquarePen color='rgb(85, 200, 39)' strokeWidth={"2px"} size={"1.2em"} />
        }
      </Link>
    )
}

export function DeletePostBtn({postId, className='', href='#'}) {
    return (
      <Link className={className} href={href}>
          <Trash2 color='tomato' strokeWidth={"2px"} size={"1.2em"} />
      </Link>
    )
}