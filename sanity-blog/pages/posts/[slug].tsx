import { PortableText } from "@portabletext/react";
import { GetStaticProps } from "next";
import React from "react";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler } from "react-hook-form";

interface Props {
  post: Post;
}

interface IformInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const postDetail = ({ post }: Props) => {
  const [submitted, setSubmitted] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IformInput>();

  const onSubmit: SubmitHandler<IformInput> = async (data) => {
    const res = await fetch("/api/createComment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    try {
      console.log(res);
      if (!res.status) throw new Error(res.statusText);
      setSubmitted(true);
      const dataResult = await res.json();
    } catch (e) {
      console.log(e);
      setSubmitted(false);
    }
  };

  console.log(post);
  return (
    <div>
      <img
        src={urlFor(post.mainImage).url()}
        alt=""
        className="w-full h-40 object-cover"
      />

      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()}
            alt=""
          />
          <p className="font-extralight text-sm">
            Blog post by:{" "}
            <span className="text-green-500"> {post.author.name} </span>
          </p>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            distinctio totam, aut consectetur quia modi amet aliquam quae
            nesciunt quasi quis blanditiis ad asperiores? Inventore soluta at
            dolores consequuntur ducimus nostrum iure, aperiam aliquam, ut
            assumenda amet. Culpa ab officiis, sit eaque consequatur eum sint
            deleniti eius praesentium iure fugiat.
          </p>
        </div>
      </article>
      <hr className="max-w-lg mx-auto border border-green-300 my-6" />
      {!submitted && (
        <form
          className="flex flex-col p-5 my-10 max-w-2xl mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />
          <h1 className="text-2xl font-bold mb-6">Leave a comment below</h1>
          <label className="mb-5">
            <span className="text-gray-500">Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Name"
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 "
            />
          </label>
          <label className="mb-5">
            <span className="text-gray-500">Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="shadow border rounded py-2 px-3 form-textarea mt-1 w-full block"
            />
          </label>
          <label className="mb-5">
            <span className="text-gray-500">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              rows={8}
              placeholder="comment"
              className="shadow border rounded y-2 px-3 form-input mt-1 block w-full ring-yellow-500 "
            />
          </label>
          <input
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 p-4 rounded cursor-pointer"
          />
          <div className="flex flex-col p-5">
            {errors.name && (
              <p className="text-red-500">the name field is required</p>
            )}
            {errors.comment && (
              <p className="text-red-500">the comment field is required</p>
            )}
            {errors.email && (
              <p className="text-red-500">the Email field is required</p>
            )}
          </div>
        </form>
      )}
      {submitted && <h1>submitted</h1>}
    </div>
  );
};

export default postDetail;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const qroq = `
  *[_type == 'post' && slug.current == $slug][0]{
    _id,
      title,
      description,
      slug,
      body,
      mainImage,
      'comments': *[
        _type == "comment" &&
        post._ref == ^._id &&
        approved == true],
      author ->{
        name,
        image
      }
  }`;

  const post = await sanityClient.fetch(qroq, {
    slug: params?.slug,
  });

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    _id,
    slug{
      current
    }
  }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => {
    return {
      params: {
        slug: post.slug.current,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
