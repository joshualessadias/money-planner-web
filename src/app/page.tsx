"use client";

import { useEffect } from "react";
import {redirect} from "next/navigation";

const Page = () => {
  useEffect(() => {
    redirect("/login")
  }, []);
};

export default Page;
