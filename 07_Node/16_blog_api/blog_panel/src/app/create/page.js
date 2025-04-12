'use client';

import styles from '@/styles/blogPage.module.css';
import Form from 'next/form';
import { useRef, useState } from 'react';

export default function Page() {
  const blogTitleRef = useRef("");
  const blogBodyRef = useRef("");
  const [empty, setEmpty] = useState(false);

  function postUpdatedBlog(e) {
    e.preventDefault();
    const titleValue = blogTitleRef.current.value;
    const bodyValue = blogBodyRef.current.value;
    const path = `/create`;
    console.log("Executing `post` fetch request for ", path);
    blogTitleRef.current.value = "";
    blogBodyRef.current.value = "";
  }

  function postPublishBlog(e) {
    e.preventDefault();
    const titleValue = blogTitleRef.current.value;
    const bodyValue = blogBodyRef.current.value;
    const path = `/publish`;
    console.log("Executing `post` fetch request for ", path);
    blogTitleRef.current.value = "";
    blogBodyRef.current.value = "";
  }

  function checkValid(e) {
    // Prevent submission of empty entries
    setEmpty(blogTitleRef.current.value==="" || blogBodyRef.current.value==="");
  }

  return (
    <div className={styles.createPost}>
      <Form className={styles.postForm}>
        <div>
            <label htmlFor='postTitle'></label>
            <input onChange={checkValid} ref={blogTitleRef} id='postTitle' 
              placeholder='Enter your title...' name='postTitle'></input>
        </div>
        <div>
            <label htmlFor='postBody'></label>
            <textarea onChange={checkValid}  ref={blogBodyRef} id='postBody' placeholder='Document your thoughts...' 
              rows={20} name='postBody'></textarea>
        </div>
        <div className={styles.actionBtns}>
            <button disabled={empty} onClick={postUpdatedBlog} type='submit'>Save</button>
            <button disabled={empty} onClick={postPublishBlog} type='submit'>Publish</button>
        </div>
      </Form>
      <div style={{fontStyle: 'oblique'}}>Note: Populate the title and body values to enable the submission buttons</div>
    </div>
  )
}
