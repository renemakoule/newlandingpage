"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BellIcon, BellRingIcon } from "lucide-react";
import { Calls } from "@/lib/store";
import { Badge } from "../ui/badge";

interface CallsCardProps {
  calls: Calls;
}

export function ScheduledCalls({ calls }: CallsCardProps) {
  const [isNotified, setIsNotified] = useState(false);

  const toggleNotification = () => {
    setIsNotified(!isNotified);
    // Ici, vous pouvez ajouter la logique pour programmer réellement une notification
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="bg-white p-8 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="flex space-x-4 ml-4">
        <Image
          src={calls.image || "/placeholder.svg"}
          alt={`Aperçu de ${calls.title}`}
          width={50}
          height={50}
          className="w-[50px] h-[50px] rounded-full object-cover transition-all duration-300 hover:scale-105 mt-3"
        />
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-5">
          {" "}
          {calls.creator}{" "}
        </p>
      </div>
      <div className="p-4">
        <h2 className="text-xs font-semibold mb-2 text-gray-800 dark:text-white">
          {calls.title}
        </h2>
        <div className="flex space-x-4 mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {calls.date}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {calls.time}
        </p>
        </div>
        <Badge
          variant={
            calls.status === "confirmed"
              ? "default"
              : calls.status === "pending"
              ? "secondary"
              : "destructive"
          }
        >
          {calls.status}
        </Badge>
      </div>
    </div>
  );
}
