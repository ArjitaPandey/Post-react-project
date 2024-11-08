import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import "../App.css";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    // const [loader, setLoader] = useState(true);

    const isAuthor = post && userData && post.userId === userData.$id;

    useEffect(() => {
        if (slug) {
            appwriteService.getPosts().then((response) => {
                if (response && response.documents) {
                    const foundPost = response.documents.find(
                        (doc) => doc.$id === slug
                    );
                    if (foundPost) {
                        setPost(foundPost);
                    } else {
                        console.log("No post found with this slug, navigating to home.");
                        navigate("/");
                    }
                    // setLoader(false);
                } else {
                    console.log("No posts found in response, navigating to home.");
                    navigate("/");
                    // setLoader(false);
                }
            }).catch((error) => {
                console.error("Error fetching posts:", error);
                navigate("/");
                // setLoader(false);
            });
        } else {
            navigate("/");
            // setLoader(false);
        }

    }, [slug, navigate]);



    const deletePost = () => {
        if (post) {
            appwriteService.deletePost(post.$id)
                .then((status) => {
                    if (status) {
                        appwriteService.deleteFile(post.featuredImage);
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting post:", error);
                });
        }
    };

    const bounceAnimation = {
        initial: { opacity: 0, y: 200 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 1,
            },
        },
        exit: {
            opacity: 0,
            y: 20,
            transition: { duration: 0.9 },
        },
    };

    return post ? (
        <div className="py-8 bg-white post-bg bg-gradient-to-br from-[#e8dfff] to-[#ffebff]">
            <Container>
                {/* Apply bounce animation to the image container */}
                <div className="w-full flex justify-center mb-4 relative border bg-white p-2 custom-card">
                    <motion.div
                        style={{ backgroundColor: '#9149ff' }}
                        className="absolute left-[35%] top-[-25%] transform -translate-x-1/2 -translate-y-1/2 p-4 text-white rounded-lg shadow-lg glowing-border"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                    >
                        <p className="text-center">Edit or Delete your post here!</p>
                    </motion.div>
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="image-preview"

                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 post-btns" id="edit-btn">
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost} className="post-btns" id="delete-btn">
                                Delete
                            </Button>
                        </div>
                    )}</div>



                {/* Apply the same bounce animation to the featured-image-container and text */}
                <motion.div
                    initial={bounceAnimation.initial}
                    animate={bounceAnimation.animate}
                    exit={bounceAnimation.exit}
                    transition={bounceAnimation.transition}
                    className="featured-image-container w-full mb-4 bg-white"
                >
                    <div className="image-description">
                        <h3 className="image-title post-text">{post.title}</h3>
                        <span className="image-caption browser-css">
                            {parse(post?.content.slice(0, 100))}
                        </span>
                    </div>
                </motion.div>
            </Container>
        </div>
    ) : (
        <div className="text-center py-8">
            <p>Post not found.</p>
        </div>
    );
}
