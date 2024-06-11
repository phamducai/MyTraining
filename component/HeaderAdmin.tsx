// "use client";

import { Button, MegaMenu, Navbar } from "flowbite-react";
import { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import CircularProgress from "./CircularProgress";
// import "react-circular-progressbar/dist/styles.css";

function HeaderAdmin() {
  // const [progress, setProgress] = useState<number>(50);
  const progress = 50;
  return (
    <MegaMenu className="bg-custom-header">
      <div className="fixed top-0 left-0 right-0 z-50 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8 bg-custom-header">
        <Navbar.Brand href="/">
          <img alt="" src="/img/logo.png" className="w-full h-auto" />
        </Navbar.Brand>
      <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-48 h-48">
        </div>
        <div className="text-lg font-semibold margin-x-15">
            Phạm Dức Ái
        </div>
        <Button color="dark" className="ms-10">Logout</Button>
      </div>
      </div>
    </MegaMenu>
  );
}
export default HeaderAdmin;
