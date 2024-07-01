import React, { useState } from "react";
import { Input, Upload, Button } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const CreateFeed: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleSubmit = () => {
    const feedData = {
      title,
      images: fileList.map((file) => file.url || file.thumbUrl),
    };
    console.log(feedData);

    // You can send the feedData object to your server here
  };

  return (
    <div>
      <h1 className="my-6 text-3xl text-center text-red-500">Create Feed</h1>
      <div className="my-4">
        <label>Title: </label>
        <Input placeholder="Enter feed title.." value={title} onChange={onTitleChange} />
      </div>

      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>

      <Button type="primary" className="mx-2 mt-3" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default CreateFeed;
