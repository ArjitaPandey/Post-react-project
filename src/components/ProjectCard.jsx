import React from 'react';
import { motion } from 'framer-motion';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';
import "../App.css";
import Card from '@mui/material/Card';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

// Animation variants for the image and text
const imageVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
};

const textVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } }
};

function ProjectCard({ $id, title, featuredImage }) {
    const imageURL = appwriteService.getFilePreview(featuredImage);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ scale: 1.05 }} 
        >
            <Link to={`/post/${$id}`}>
                <Card sx={{ maxWidth: 345 }}>
                    <motion.div variants={imageVariant}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={imageURL}
                            alt={title}
                        />
                    </motion.div>

                    <CardContent>
                        <motion.div variants={textVariant}>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                        </motion.div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}

export default ProjectCard;

