"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { UserProfile, userProfiles } from "@/lib/netflix-data";
import { cn } from "@/lib/utils";

interface ProfileSelectorProps {
  onSelectProfile: (profile: UserProfile) => void;
}

export function ProfileSelector({ onSelectProfile }: ProfileSelectorProps) {
  const [isManageMode, setIsManageMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <svg
        viewBox="0 0 111 30"
        className="h-8 md:h-10 fill-[#e50914] absolute top-6 left-6"
        aria-label="Netflix"
      >
        <path d="M105.062 14.28L111 30c-1.75-.25-3.499-.563-5.28-.845l-3.345-8.686-3.437 7.969c-1.687-.282-3.344-.376-5.031-.595l6.031-13.75L94.468 0h5.063l3.062 7.874L105.875 0h5.124l-5.937 14.28zM90.47 0h-4.594v27.25c1.5.094 3.062.156 4.594.343V0zm-8.563 26.937c-4.187-.281-8.375-.53-12.656-.625V0h4.687v21.875c2.688.062 5.375.28 7.969.405v4.657zM64.25 10.657v4.687h-6.406V26H53.22V0h13.125v4.687h-8.5v5.97h6.406zm-18.906-5.97V26.25c-1.563 0-3.156 0-4.688.062V4.687h-4.844V0h14.406v4.687h-4.874zM30.75 15.593c-2.062 0-4.5 0-6.25.095v6.968c2.75-.188 5.5-.406 8.281-.5v4.5l-12.968 1.032V0H32.78v4.687H24.5V11c1.813 0 4.594-.094 6.25-.094v4.688zM4.78 12.968v16.375C3.094 29.531 1.593 29.75 0 30V0h4.469l6.093 17.032V0h4.688v28.062c-1.656.282-3.344.376-5.125.625L4.78 12.968z" />
      </svg>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl text-white font-medium mb-8">
        {isManageMode ? "Manage Profiles:" : "Who's watching?"}
      </h1>

      {/* Profile Grid */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
        {userProfiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => !isManageMode && onSelectProfile(profile)}
            className="group flex flex-col items-center gap-2"
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className={cn(
                  "w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded overflow-hidden",
                  "border-2 border-transparent transition-all duration-200",
                  "group-hover:border-white"
                )}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className={cn(
                    "w-full h-full object-cover",
                    isManageMode && "opacity-50"
                  )}
                />
              </div>

              {/* Edit overlay in manage mode */}
              {isManageMode && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white flex items-center justify-center bg-black/50">
                    <Pencil className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              )}

              {/* Kids badge */}
              {profile.isKids && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#e50914] text-white text-[10px] px-2 py-0.5 rounded">
                  KIDS
                </div>
              )}
            </div>

            {/* Name */}
            <span
              className={cn(
                "text-gray-400 text-sm md:text-base group-hover:text-white transition-colors",
                isManageMode && "text-gray-500"
              )}
            >
              {profile.name}
            </span>
          </button>
        ))}

        {/* Add Profile Button */}
        {!isManageMode && userProfiles.length < 5 && (
          <button className="group flex flex-col items-center gap-2">
            <div className="w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded bg-[#333] flex items-center justify-center group-hover:bg-[#444] transition-colors">
              <Plus className="w-12 h-12 md:w-16 md:h-16 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-gray-400 text-sm md:text-base group-hover:text-white transition-colors">
              Add Profile
            </span>
          </button>
        )}
      </div>

      {/* Manage Profiles Button */}
      <button
        onClick={() => setIsManageMode(!isManageMode)}
        className={cn(
          "mt-10 px-6 py-2 text-gray-400 text-sm tracking-widest border border-gray-500",
          "hover:text-white hover:border-white transition-colors",
          isManageMode &&
            "bg-white text-black border-white hover:bg-[#e50914] hover:border-[#e50914]"
        )}
      >
        {isManageMode ? "DONE" : "MANAGE PROFILES"}
      </button>
    </div>
  );
}
