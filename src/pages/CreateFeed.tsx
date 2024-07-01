import { Input } from "antd";
import { useState, ChangeEvent } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_QUOTE } from "../graphql/mutations/mutations";


function App() {
  const [images, setImages] = useState<File[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [showCreateButton, setShowCreateButton] = useState<boolean>(false);
  const [createQuote] = useMutation(CREATE_QUOTE);

  const uploadImages = async (files: File[]) => {
    const newUrls: string[] = [];

    for (const image of files) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "reactNestGql");
      data.append("cloud_name", "dowpna0vx");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dowpna0vx/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const cloudData = await res.json();
        newUrls.push(cloudData.url);
      } catch (error) {
        console.log(error);
      }
    }

    setUrls((prevUrls) => [...prevUrls, ...newUrls]);
    setShowCreateButton(true); // Show the button after images are uploaded
    console.log(newUrls);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setShowCreateButton(false); // Hide the button while uploading
    uploadImages(files);
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
            images: urls,
          },
        },
      });
      console.log('Quote created:', data);
      alert('Quote created successfully!');
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Error creating quote.');
    }
  };

  console.log("URLs", urls);

  return (
    <>
      <label>Title :</label>
      <Input placeholder="Feed title.." onChange={handleTitleChange} />
      <div className="flex items-center justify-center mt-4">
        <div className="bg-[#2C3A47] p-10 rounded-xl">
          <div className="flex justify-center mb-5 input">
            <label htmlFor="file-upload" className="custom-file-upload">
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
              id="file-upload"
              className="text-white"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
      {showCreateButton && (
        <button className="bg-[#FC427B] mt-4" onClick={handleCreateQuote}>
          Create Quote
        </button>
      )}
    </>
  );
}

export default App;
