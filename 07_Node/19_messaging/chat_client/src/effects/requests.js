import { axiosApi } from "@/config/axios";

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


export { fetchCommunityMembers, fetchUserConversations, fetchUserMessages }