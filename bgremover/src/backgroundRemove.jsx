import React, { useState } from 'react';
import "./index.css"
import Loading from './Loading';

const BackgroundRemover = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [processedImageUrl, setProcessedImageUrl] = useState('');
    const [loading , setLoading] = useState(false)

    const removeBackground = async () => {
        const apiKey = "B5zdJ4BaTuuQD9AToG9Y1g8y";
        const url = "https://api.remove.bg/v1.0/removebg"

        const formData = new FormData()
        formData.append("image_file", imageUrl, imageUrl.name)
        formData.append("size", "auto")
        setLoading(true)
        fetch(url, {
            method: "POST",
            headers: {
                "X-Api-Key": apiKey
            },
            body: formData
        }).then((res) => res.blob()).then((blob) => {
            const reder = new FileReader();
            reder.onloadend = () => setProcessedImageUrl(reder.result)
            reder.readAsDataURL(blob)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
        
    };

    const handleDownload = () => {
        // Create a temporary anchor element to trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = processedImageUrl;
        downloadLink.download = 'processed_image.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const removeProccesdImage =()=>{
        setProcessedImageUrl([])
        window.location.reload()
    }

    return (
        <div className='w-full h-screen bg-slate-200 flex flex-col gap-5 p-2
            main_box'>
                <div className='h1 border-b-2 pb-3 border-red-700'>
                <h1 className='text-center text-2xl font-semibold'>Remove Background</h1>  
                </div>

            <div className='w-full flex justify-center gap-5 h-full respnsive'>
                <div className='flex flex-col bg-slate-100 w-2/5 justify-center gap-5 items-center shadow-lg input_field'>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs"
                        onChange={(e) => { setImageUrl(e.target.files[0]) }}
                    />
                    <button onClick={removeBackground} className='bg-black text-white px-6 py-2 rounded-md w-56'>Remove Background</button>
                </div>

                <div className='w-2/4 bg-slate-50 h-full photo_Sec  overflow-scroll'>
                    {loading ? (<Loading/>) : (processedImageUrl && (
                        <div className='w-full'>
                            <div className='w-full p-2 flex justify-center items-center'>
                            <img src={processedImageUrl} alt="Processed" />
                            </div>

                            <div className='w-full p-2 flex justify-center items-center gap-5'>
                            <button onClick={handleDownload} className='bg-green-800 px-5 py-2 rounded-md text-white '>Download Image</button>
                            <button onClick={removeProccesdImage} className='px-5 py-2 rounded-md bg-red-500 font-semibold'>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
};

export default BackgroundRemover;
