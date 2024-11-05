import React, { useEffect, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/services/authService";
interface AuthProps {
  // Add specific props here
}

const withAuth = <P extends AuthProps>(Component: ComponentType<P>) => {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const router = useRouter();
    useEffect(() => {
      if (!getToken()) {
        router.replace("/login");
      }
    }, []);

    return <Component {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${
    Component.displayName || Component.name || "Component"
  })`;

  return AuthenticatedComponent;
};

export default withAuth;
