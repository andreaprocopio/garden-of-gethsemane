"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { X } from "lucide-react";
import { deletePreset } from "@/lib/actions/deletePreset";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface DeletePresetButtonProps {
  presetId: string;
}

const DeletePresetButton: React.FC<DeletePresetButtonProps> = ({
  presetId,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const result = await deletePreset(presetId);
    setLoading(false);

    if (result.success) {
      toast.success("Preset deleted succesfully");
    } else {
      toast.error(`Error: ${result.error}`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Delete preset"
          className="cursor-pointer"
          disabled={loading}
        >
          {loading ? <X className="animate-spin" size={16} /> : <X size={16} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Confirm elimination</DialogTitle>
          <DialogDescription>
            Are you sure that you want to delete this preset? This action
            can&apos;t be undone
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Yes, delete it"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePresetButton;
