import { axiosApi } from "@/config/axios";
import toast from "react-hot-toast";

// Parallel  fetch
async function fetchCommunityMembers(controller,
  updateMembers, updateGroups,
  membersLoading, groupsLoading
) {
  axiosApi.get(`/v1/chat/community`, 
    {signal: controller.signal}).then(
      (res)=>(updateMembers(res.data))
    ).catch((err)=>{ 
      if (err?.code!=="ERR_CANCELED") {
        console.log(err) 
      }     
    })
    .finally(membersLoading(false));
  
  axiosApi.get(`/v1/chat/groups`, 
    {signal: controller.signal}).then(
      (res)=>(updateGroups(res.data))
    ).catch((err)=>{ 
      if (err?.code!=="ERR_CANCELED") {
        console.log(err) 
      } 
    })
    .finally(() => groupsLoading(false));
}

// Single fetch
async function fetchUserConversations(
  controller, updateHistory, updateFriendList, updateLoading
) {
  axiosApi.get(`/v1/chat/user-chats`,
    { signal: controller.signal }).then(
      (res) => {
        updateHistory(res.data.conversations)
        updateFriendList(res.data.friends)
      }
    ).catch((err) => {
      if (err?.code!=="ERR_CANCELED") {
        console.log(err) 
      }
    })
    .finally(() => updateLoading(false));
}

async function fetchUserMessages(
  id, controller, updateMessages, updateMetadata, updateLoading
) {
  axiosApi.get(`/v1/chat/conv-hist/${id}`,
    { signal: controller.signal }).then(
      (res) => {
        updateMetadata(res.data?.metadata)
        updateMessages(res.data?.messages)
      }
    ).catch((err) => {
      if (err?.code!=="ERR_CANCELED") {
        console.log(err) 
      }  
    })
    .finally(() => updateLoading(false));
}

async function fetchUserProfile(controller, updateUserData, updateLoading) {
  try {
    const res = await axiosApi.get('/v1/chat/get-user-profile',
      { signal: controller.signal }
    );
    updateUserData(res.data)
  } catch(err) {
    if (err?.code!=="ERR_CANCELED") {
      toast.error(err.message || "Failed to load user profile");
    }
  } finally {
    updateLoading(false)
  }
  return ()=>{ controller.abort() }
}


export { fetchCommunityMembers, fetchUserConversations, fetchUserMessages, fetchUserProfile }