// import useAxiosPrivate from "@/hooks/useAxiosInterceptor";
// import { useEffect } from "react";


// function TestAxios() {
//     const axiosPrivate = useAxiosPrivate();


//     useEffect(()=>{
//       let isMounted = true;
//       const controller = new AbortController();

//       // You can use it with 
//       async function getData() {
//         try {
//           const resp = await axiosPrivate.get('/v1/panel/posts',{
//             signal: controller.signal
//           })
//           console.log(resp.data);
//           // isMounted && // set Data fro cache etc
//         } catch(err) {
//           console.error(err)
//         }
//       } 

//       getData();

//       return () => {
//         isMounted = false;
//         controller.abort();
//       }
//     }, [])
// }

async function getProtectedPosts(timeoutMs = 10000) {
  const controller = new AbortController();

  // Set up timeout to abort if it takes too long
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  try {
    const resp = await axiosApi.get("/v1/panel/posts", { 
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      signal: controller.signal}
    )
    
    clearTimeout(timeoutId);
    const data = resp.data;
    
    if (resp.status===200) {
      return { success: true, data: data };
    } else {
      return { success: false, error: data?.message || 'Failed to create user' };
    }
    
  
  } catch(err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { success: false, error: 'Request timed out. Please try again.'};
    }

    return { success: false, error: err.message || 'No server response' }
  }
}