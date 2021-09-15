import { AuthProvider } from "./AuthContext";

function AppProvider({ children }: any) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default AppProvider;