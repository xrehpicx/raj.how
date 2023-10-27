"use client";
import Image from "next/image";
import profile_img from "./profile.png";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Profile />
    </motion.div>
  );
}

function Profile() {
  return (
    <div className="gap-2 items-center justify-center flex">
      <Image
        className="rounded-full"
        alt="profile image"
        src={profile_img}
        width={30}
        height={30}
      />
      <h1 className="text-2xl font-bold text-center">./raj</h1>
    </div>
  );
}
