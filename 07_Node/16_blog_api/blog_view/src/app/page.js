'use client';

import { FreeLandingPage, AuthenticatedLandingPage } from "@/components/LandingPage";
import useAuth from "@/hooks/useAuth";
import styles from "./page.module.css";

export default function Home() {
  const { accessToken } = useAuth();
  
  return (
    <>
    { accessToken ? <AuthenticatedLandingPage /> : <FreeLandingPage />}
    </>
  );
}
