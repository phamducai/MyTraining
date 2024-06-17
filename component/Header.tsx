
"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  return (
    <Navbar fluid rounded className="fixed top-0 w-full z-50">
      <Navbar.Brand as={Link} href="https://www.famima.vn">
        <img src="/img/logo.png" className="mr-3 sm:h-9" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="cursor-pointer">
        <Navbar.Link active onClick={() => router.push("/")}>Trang Chủ</Navbar.Link>
        <Navbar.Link href="#" >
          Khóa Học Của Tôi 
        </Navbar.Link>
        <Navbar.Link  onClick={() => router.push("/admin")}>Quản Trị</Navbar.Link>
        <Navbar.Link href="#">Đăng xuất</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
