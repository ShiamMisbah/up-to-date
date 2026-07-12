import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/use-create-post";
import { createCommentSchema } from "@/schema/post.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";

type Props = {
  parentId: string;
};

const CommentForm = ({ parentId }: Props) => {
  const { error, handleCreateComment, loading } = useCreatePost();
  const form = useForm<createCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      mainText: "",
    },
  });

  const onSubmit = async (data: createCommentSchema) => {
    try {
      const res = await handleCreateComment(data, parentId);
      console.log(res);
      form.reset()
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="relative flex justify-between items-center p-2 bg-textGrayFade rounded-full">
            <Controller
              name="mainText"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Textarea
                    {...field}
                    id="login-form-enail"
                    aria-invalid={fieldState.invalid}
                    placeholder="Write Comment"
                    className="px-5 min-h-8 text-xs resize-none border-0 outline-none
                    focus:outline-none
                    focus:ring-0
                    focus-visible:outline-none
                    focus-visible:ring-0
                    focus-visible:ring-offset-0

                    invalid:outline-none
                    invalid:ring-0
                    invalid:border-0

                    aria-invalid:outline-none
                    aria-invalid:ring-0
                    aria-invalid:border-0"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-left absolute top-14 text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
            <Button
              type="submit"
              className="w-auto h-auto px-5.5 min-h-9 text-[16px] gap-3 flex-1 rounded-full"
              disabled = {loading}
            >
              <Send />
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CommentForm;
