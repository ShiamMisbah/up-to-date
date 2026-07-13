"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/use-create-post";
import { PrivacyStatus } from "@/lib/types";
import { createPostSchema } from "@/schema/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Image, Send, Settings, Video } from "lucide-react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {};

const PostForm = (props: Props) => {
  const {error, handleCreatePost, loading} = useCreatePost()

  const imageInputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);
  };

  const form = useForm<createPostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      mainText: "",
      privacyStatus: PrivacyStatus.PUBLIC,
    },
  });

  const onSubmit = async (data: createPostSchema) => {
    const formData = new FormData()
    formData.append("mainText", data.mainText)
    formData.append("privacyStatus", data.privacyStatus);

    if (selectedImage) {
      formData.append("image", selectedImage)
    }

    try {
        const res = await handleCreatePost(formData);
        form.reset()
        setSelectedImage(null)
        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
        console.log(res)
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="bg-white w-full max-w-159 min-h-52.5 p-6 rounded-sm">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="mainText"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <Textarea
                  {...field}
                  id="login-form-enail"
                  aria-invalid={fieldState.invalid}
                  placeholder="Write Something ......"
                  className="min-h-28 text-xs resize-none border-0 outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none focus:outline-none"
                />
                {fieldState.invalid && (
                  <FieldError
                    className="text-left text-xs"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              className="mt-4 h-40 rounded-lg object-cover"
            />
          )}
          <div className="flex justify-between items-center bg-fadeSkyBlue rounded-sm p-2 gap-15">
            <div className="flex justify-evenly flex-3 pl-2">
              <>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
              <Button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center"
              >
                <Image className="size-6" />
                <span className="hidden md:block">Photo</span>
              </Button>
              <Button className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center">
                <Video className="size-6" />
                <span className="hidden md:block">Video</span>
              </Button>
              <Controller
                name="privacyStatus"
                control={form.control}
                render={({ field }) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        type="button"
                        className="bg-transparent text-textGray hover:text-primary hover:bg-transparent flex gap-2.5 items-center"
                      >
                        <Settings className="size-6" />
                        <span className="hidden md:block">{field.value}</span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => field.onChange("public")}
                      >
                        Public
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => field.onChange("private")}
                      >
                        Private
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-auto h-auto px-5.5 py-3 text-[16px] rounded-sm gap-3 flex-1"
              disabled={loading}
            >
              <Send className="size-6" />
              <span className="hidden md:block">
                {loading ? "Posting" : "Post"}
              </span>
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default PostForm;
