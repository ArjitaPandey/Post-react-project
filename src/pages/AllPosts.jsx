import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import appwriteService from "../appwrite/config";
import { Container, ProjectCard } from '../components';
import Loader from "../components/Loader";
import "../App.css";
import animatedFigure from "../../src/assets/images/animatedGirlImage.png";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <Loader />;
    }


    const bounceAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
        },

    };

    const bounceCardAnimation = {
        y: [0, -1, 0],
        transition: {
            duration: 1,
            ease: "easeInOut",
            repeat: Infinity,
        },

    };



    return (
        <div className='w-full py-8 bg-gradient-to-br from-[#e8dfff] to-[#ffebff] h-[100vh]'>
            <Container>
                <div className='flex flex-wrap -mx-4'>
                    <motion.div
                        initial="hidden"
                        className="popup-box"
                        style={{
                            position: 'fixed',
                            bottom: '25%',
                            right: '20px',
                            background: '#9149ff',
                            padding: '15px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            fontFamily: 'Poppins, sans-serif',
                        }}
                        animate={bounceAnimation}
                    >
                        <motion.p
                            whileHover={{ scale: 1.05 }}
                            style={{ color: 'rgb(253, 253, 253)', fontSize: '16px', fontWeight: 'bold' }}
                        >
                            Click on Add Post for more such posts!
                        </motion.p>
                    </motion.div>
                    <motion.img
                        src={animatedFigure}
                        style={{
                            height: '25%',
                            position: 'fixed',
                            bottom: '10px',
                            right: '10%',
                        }}
                        alt="Cute Animated"
                        className="absolute w-1/3 h-1/3 object-contain opacity-80"
                        initial="hidden"
                        animate={bounceAnimation}
                    />
                    {posts.map((post) => (
                        <div key={post.$id} className='p-4 w-full md:w-1/2 lg:w-1/4'>
                            <motion.div initial="hidden"
                                animate={bounceCardAnimation}>
                                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    <ProjectCard {...post} />

                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
