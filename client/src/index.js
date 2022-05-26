import App from "./App";
// CSS
import "./App.css";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import jwtInterceptor from "./utils/jwtInterceptor";
// Context ---------------------------------------------
import { AuthProvider } from "./contexts/authentication";
import { NavigateProvider } from "./contexts/navigate";
import { UserDataProvider } from "./contexts/usersData";
import { JobsDataProvider } from "./contexts/jobsData";
import { VadilationProvider } from "./contexts/vadilation";
/* import { ThemeProvider } from "@mui/material/styles";
 */
jwtInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/*       <ThemeProvider>
       */}{" "}
      <UserDataProvider>
        <VadilationProvider>
          <AuthProvider>
            <JobsDataProvider>
              <NavigateProvider>
                <App />
              </NavigateProvider>
            </JobsDataProvider>
          </AuthProvider>
        </VadilationProvider>
      </UserDataProvider>
      {/*       </ThemeProvider>
       */}{" "}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
