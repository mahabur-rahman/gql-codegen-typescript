import { Input } from "antd";
import { useState, ChangeEvent } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from "../graphql/mutations/mutations";
import { GET_ALL_QUOTES } from "../graphql/queries/queries";
import { useNavigate } from "react-router-dom";

const CreateFeed = () => {
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [createQuote] = useMutation(CREATE_QUOTE, {
    refetchQueries: [{ query: GET_ALL_QUOTES }],
  });

  const navigate = useNavigate();

  const uploadFiles = async (files: File[], type: "image" | "video") => {
    const newUrls: string[] = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "reactNestGql");
      data.append("cloud_name", "dowpna0vx");
      data.append("resource_type", type);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/dowpna0vx/${type}/upload`,
          {
            method: "POST",
            body: data,
          }
        );

        const cloudData = await res.json();
        newUrls.push(cloudData.url);
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
      }
    }

    if (type === "image") {
      setImageUrls((prevUrls) => [...prevUrls, ...newUrls]);
    } else {
      setVideoUrls((prevUrls) => [...prevUrls, ...newUrls]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
    const files = Array.from(e.target.files || []);
    if (type === "image") {
      setImages(files);
      uploadFiles(files, "image");
    } else {
      setVideos(files);
      uploadFiles(files, "video");
    }
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCreateQuote = async () => {
    try {
      const { data } = await createQuote({
        variables: {
          createQuoteDto: {
            title,
            images: imageUrls,
            videos: videoUrls,
          },
        },
      });
      console.log('Quote created:', data);
      alert('Quote created successfully!');
      navigate("/quotes");
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Error creating quote.');
    }
  };

  return (
    <>
      <label>Title :</label>
      <Input placeholder="Feed title.." onChange={handleTitleChange} />
      <div className="flex items-center justify-center mt-4">
        <div className="bg-[#2C3A47] p-10 rounded-xl">
          <div className="flex justify-center mb-5 input">
            <label htmlFor="image-upload" className="custom-file-upload">
              {images.length > 0 ? (
                images.map((image, index) => (
                  <img
                    key={index}
                    className="w-72 lg:w-96 rounded-xl"
                    src={URL.createObjectURL(image)}
                    alt="img"
                  />
                ))
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                  className="w-20 h-20"
                />
              )}
            </label>
            <input
              id="image-upload"
              className="text-white"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileChange(e, "image")}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div className="bg-[#2C3A47] p-10 rounded-xl">
          <div className="flex justify-center mb-5 input">
            <label htmlFor="video-upload" className="custom-file-upload">
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <video
                    key={index}
                    className="w-72 lg:w-96 rounded-xl"
                    src={URL.createObjectURL(video)}
                    controls
                  />
                ))
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1665/1665680.png"
                  className="w-20 h-20"
                />
              )}
            </label>
            <input
              id="video-upload"
              className="text-white"
              type="file"
              multiple
              accept="video/*"
              onChange={(e) => handleFileChange(e, "video")}
            />
          </div>
        </div>
      </div>
      {(imageUrls.length > 0 || videoUrls.length > 0) && (
        <button className="bg-[#FC427B] mt-4" onClick={handleCreateQuote}>
          Create Quote
        </button>
      )}
    </>
  );
}

export default CreateFeed;
