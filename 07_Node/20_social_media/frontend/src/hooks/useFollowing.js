import FollowingContext from "@/context/FollowingProvider";
import { useContext } from "react";

export default function useFollowing() {
  const context =  useContext(FollowingContext)
  if (!context) {
    throw new Error("useFollowing must be used within a FollowingProvider");
  }
  return context;
}