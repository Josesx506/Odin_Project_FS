import CommentButton from '@/components/buttons/CommentButton';
import LikeButton from '@/components/buttons/LikeButton';
import ViewsButton from '@/components/buttons/ViewsButton';
import { RiShare2Fill } from "react-icons/ri";

export function PostThumbnailInteraction({ postId, likes, comments, views }) {
  const cmpStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'darkgray'
  }
  return (
    <div style={cmpStyle}>
      <CommentButton comments={comments}/>
      <LikeButton postId={postId} value={likes} />
      <ViewsButton views={views} />
      <RiShare2Fill cursor={'pointer'} />
    </div>
  )
}
