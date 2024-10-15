import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/authService";

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    useEffect(() => {
      if (!getToken()) {
        router.replace("/login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
