import { useEffect, useState, React } from 'react'
import appwriteService from "../appwrite/config";
import { Container, ProjectCard } from '../components';
import Loader from "../components/Loader"
import 'animate.css';
import { motion } from 'framer-motion';
import animatedFigure from "../../src/assets/images/animatedGirlImage.png";
import "../App.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [animationComplete, setAnimationComplete] = useState(false);
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (<Loader />)
    }

    if (posts.length === 0) {
        return (
            <div className="w-full h-[60vh] bg-white flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8dfff] to-[#ffebff] h-[90vh]">
                <Container>
                    <motion.img
                        src={animatedFigure}
                        style={{ height: '25%' }}
                        alt="Cute Animated"
                        className="absolute bottom-0 left-0 w-1/3 h-1/3 object-contain opacity-80"
                        initial={{ x: '300%', opacity: 0 }}
                        animate={{ x: '100%', opacity: 1 }}
                        onAnimationComplete={() => setAnimationComplete(true)}
                        transition={{
                            x: {
                                duration: 2, // Duration of the animation
                                ease: 'linear',

                            },
                            opacity: {
                                duration: 1,
                                ease: 'linear'
                            }
                        }}
                    />
                    {animationComplete && (
                        <motion.div
                            style={{ backgroundColor: '#9149ff' }}
                            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 text-white rounded-lg shadow-lg glowing-border"
                            initial={{ opacity: 0, y: -100, x: 80 }}
                            animate={{ opacity: 1, y: 150, x: 80 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <p className="text-center">Login to read posts!</p>
                        </motion.div>
                    )}
                </Container>
            </div>

        )
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
        <div className='w-full py-8 bg-white-50 bg-gradient-to-br from-[#e8dfff] to-[#ffebff] h-[100vh]'>
            <Container>
                <div className='flex flex-wrap -mx-4'>
                    <motion.div
                        initial="hidden"
                        // animate="visible"
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
                            <motion.div initial="hidden" animate={bounceCardAnimation}>
                                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                                    <ProjectCard {...post} />

                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
