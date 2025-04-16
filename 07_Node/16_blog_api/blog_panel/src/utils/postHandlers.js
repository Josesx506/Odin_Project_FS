// handlers are for updating state or other state/memory features

import { toast } from 'react-hot-toast';
import { handleCreatePost, handleDeletePost, handleEditPost } from './postActions';


async function deletePostDetails({
  postId 
}) {
  try {
    await handleDeletePost({ postId });
    toast.success('Post deleted');
  } catch (err) {
    toast.error(err.message || 'Delete Failed');
  }
}


async function deletePostThumbnailHandler({
  postId, onPostDelete,
}) {
  try {
    await handleDeletePost({ postId });
    onPostDelete?.(postId);    // Send a signal to the PostProvider component to unmount this post thumbnail
    toast.success('Post deleted');
  } catch (err) {
    toast.error(err.message || 'Delete Failed');
  }
}


export { deletePostDetails, deletePostThumbnailHandler }