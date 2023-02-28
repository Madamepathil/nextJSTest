import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  console.log(posts);
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>medium blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* banner */}
      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-blue-300 decoration-4">
              Medium
            </span>{" "}
            is a place to write read and connect
          </h1>
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            beatae minus, velit asperiores numquam amet voluptas! Minus repellat
            unde neque!
          </h2>
        </div>
        <img
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt=""
          className="hidden md:inline-flex h-32 lg:h-full"
        />
      </div>
      {/* posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 ">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug.current}`}>
            <div className="group cursor-pointer">
              <img
                src={urlFor(post.mainImage).url()}
                alt=""
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-sm">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  src={urlFor(post.author.image).url()}
                  alt=""
                  className="h-12 w-12 rounded-full object-fill"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const qroq = `
  *[_type == 'post']{
    _id,
      title,
      description,
      slug,
      mainImage,
      author ->{
        name,
        image
      }
  }`;

  const posts = await sanityClient.fetch(qroq);
  return {
    props: {
      posts,
    },
  };
};
