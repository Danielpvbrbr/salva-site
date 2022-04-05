import React from "react";
import AuthProvider from './contexts/auth';

import Routes from './routes/index';

const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default App;