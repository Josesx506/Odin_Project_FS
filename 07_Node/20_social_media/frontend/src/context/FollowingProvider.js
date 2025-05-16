'use client';

import { axiosApi } from "@/config/axios";
import { createContext, useCallback, useState } from "react";

const FollowingContext = createContext();

export const FollowingProvider = ({ children }) => {
  const [followingStates, setFollowingStates] = useState({})

  function updateFollowingState(targetId, value) {
    setFollowingStates(prev => ({
      ...prev, [targetId]: value,
    }))
  }

  async function followUser(targetId) {
    try {
      await axiosApi.get(`/v1/social/users/follow?targetId=${targetId}`);
      const res = await axiosApi.get(`/v1/social/users/is-following?targetId=${targetId}`);
      updateFollowingState(targetId, res.data?.isFollowing || false);
      return true;
    } catch (error) {
      if (err?.code !== "ERR_CANCELED") {console.error("Error following user:", error)};
      throw error;
    }
  };

  async function unfollowUser(targetId) {
    try {
      await axiosApi.get(`/v1/social/users/unfollow?targetId=${targetId}`);
      const res = await axiosApi.get(`/v1/social/users/is-following?targetId=${targetId}`);
      updateFollowingState(targetId, res.data?.isFollowing || false);
      return true;
    } catch (error) {
      if (err?.code !== "ERR_CANCELED") {console.error("Error unfollowing user:", error)}
      throw error;
    }
  };

  async function checkFollowStatus(targetId, updateLoader) {
      if (!targetId) {
        updateFollowingState(targetId, false);
        updateLoader(false);
        return;
      }
      if (followingStates[targetId] !== undefined) {
        updateLoader(false);
        return followingStates[targetId];
      }
      try {
        const res = await axiosApi.get(`/v1/social/users/is-following?targetId=${targetId}`);
        updateFollowingState(targetId, res.data?.isFollowing || false);
      } catch (err) {
        if (err?.code !== "ERR_CANCELED") { console.log(err) };
        throw err;
      } finally {
        updateLoader(false);
      }
    };

  return (
    <FollowingContext.Provider value={{ followUser, unfollowUser, followingStates, 
    updateFollowingState, checkFollowStatus }}>
      {children}
    </FollowingContext.Provider>
  );
}

export default FollowingContext;
