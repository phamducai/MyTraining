
"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
// import CircularProgress from "./CircularProgress";

export function Header() {
  const progress =50;
  return (
    <Navbar fluid rounded className="fixed top-0 w-full z-50">
      <Navbar.Brand as={Link} href="https://www.famima.vn">
        <img src="/img/logo.png" className="mr-3 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#"active>Trang Chủ</Navbar.Link>
        <Navbar.Link href="#" >
          Khóa Học Của Tôi 
        </Navbar.Link>
        <Navbar.Link href="#">Admin</Navbar.Link>
        <Navbar.Link href="#">Logout</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}








// // "use client";

// import { Button, MegaMenu, Navbar } from "flowbite-react";
// // import { useState } from "react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import CircularProgress from "./CircularProgress";
// // import "react-circular-progressbar/dist/styles.css";

// function Header() {
//  const progress =50;
//   return (
//     <MegaMenu>
//       <div className="fixed top-0 left-0 right-0 z-50 mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
//         <Navbar.Brand href="/">
//           <img alt="" src="/img/logo.png" className="w-full h-auto" />
//         </Navbar.Brand>
//       <div className="flex justify-center items-center">
//       <div className="flex justify-center items-center w-48 h-48">
//           <CircularProgress value={progress} /> <span className="margin-x-5">1/10</span>
//           <span>Bài Học</span>
//         </div>
//         <div className="text-lg font-semibold margin-x-15">
//             Phạm Dức Ái
//         </div>
//         <Button color="dark" className="ms-10">Logout</Button>
//       </div>
//       </div>
//     </MegaMenu>
//   );
// }
// export default Header;
