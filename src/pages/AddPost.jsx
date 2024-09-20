import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
    return (
        <div className='w-full py-8 bg-gray-50 bg-gradient-to-br from-[#e8dfff] to-[#ffebff] '>
            <Container>
                <PostForm />
            </Container>
        </div>
)
}

export default AddPost