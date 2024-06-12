"use client";
import HeaderAdmin from "@/component/HeaderAdmin";
import { SidebarAdmin } from "@/component/SideBarAdmin";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  title: string;
  videoFile: FileList;
  course_id: string;
};

const AddVideo: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new FormData();
    const videoFile = data.videoFile[0];

    formData.append("title", data.title);
    formData.append("course_id", data.course_id);
    formData.append("videoFile", videoFile);

    try {
      const response = await fetch("/api/videos/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setMessage("Video uploaded successfully!");
      } else {
        setMessage("Error uploading video.");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      setMessage("Error uploading video.");
    }
  };

  return (
    <div className="">
    <HeaderAdmin />
    <div className="mt-16 mb-20">
      <div className="flex">
        <SidebarAdmin />
        <div className="w-3/4 mx-auto">
          <h1 className="text-2xl font-bold mb-4">Add New Video</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Video Title" />
              </div>
              <TextInput
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
                shadow
              />
              {errors.title && <p className="text-red-600">{errors.title.message}</p>}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="videoFile" value="Upload Video" />
              </div>
              <input
                id="videoFile"
                type="file"
                {...register("videoFile", { required: "Video file is required" })}
                accept="video/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {errors.videoFile && <p className="text-red-600">{errors.videoFile.message}</p>}
            </div>
            <Button type="submit">Upload Video</Button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AddVideo;
