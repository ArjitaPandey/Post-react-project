
import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPosts(slug).then((post) => {
                const foundPost = post.documents.find(
                        (doc) => doc.$id === slug
                );
                if (foundPost) {
                    setPosts(foundPost);
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='w-full py-8 bg-gray-50 bg-gradient-to-br from-[#e8dfff] to-[#ffebff]'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost

