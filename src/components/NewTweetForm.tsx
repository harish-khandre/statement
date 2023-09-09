"use client";

import { useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import {
  type FormEvent,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { api } from "~/utils/api";

function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
  if (textArea == null) return;
  textArea.style.height = "0";
  textArea.style.height = `${textArea.scrollHeight}px`;
}

const NewTweetForm = () => {
  const session = useSession();
  if (session.status !== "authenticated") return;
  return <Form />;
};

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, []);

  const trpcUtils = api.useContext();

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const createTweet = api.tweet.create.useMutation({
    onSuccess: (newTweet) => {
      setInputValue("");

      if (session.status !== "authenticated") return;

      trpcUtils.tweet.infiniteFeed.setInfiniteData({}, (oldData) => {
        if (oldData?.pages[0] == null) return;
        const newCacheTweet = {
          ...newTweet,
          likeCount: 0,
          likedByMe: false,
          user: {
            id: session.data.user.id,
            name: session.data.user.name ?? null,
            image: session.data.user.image ?? null,
          },
        };
        return {
          ...oldData,
          pages: [
            {
              ...oldData.pages[0],
              tweets: [newCacheTweet, ...oldData.pages[0].tweets],
            },
            ...oldData.pages.slice(1),
          ],
        };
      });
    },
  });

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    createTweet.mutate({ content: inputValue });
  }
  const session = useSession();

  if (session.status !== "authenticated") return null;
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-b px-4  py-2 rounded-full "
    >
      <div className="flex gap-4">
        <ProfileImage className="my-4" src={session.data.user.image} />
        <textarea
          minLength={1}
          style={{ height: 0 }}
          ref={inputRef}
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          className="flex-grow resize-none overflow-hidden rounded-full border-white border-2 bg-transparent p-4 text-lg text-white outline-0 my-2 self-center "
          placeholder="what's on your mind?"
          required
        />
      </div>
      <button className="button self-end px-8 mb-2">Submit</button>
    </form>
  );
};

export default NewTweetForm;
