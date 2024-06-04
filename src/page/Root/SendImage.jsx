import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import Wrapper from "../../components/ui/Wrapper";
import { Button, VStack } from "@chakra-ui/react";
import { useUserData } from "../../components/Context/UserDataContext";

function SendImage() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const { userData } = useUserData();
  const { mailBoxID } = userData || {};

  const uploadFile = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${mailBoxID}/${imageUpload.name}`);
    const UploadResult = await uploadBytes(imageRef, imageUpload);
    const url = await getDownloadURL(UploadResult.ref);
    setImageUrls((prev) => [...prev, url]);
  };

  useEffect(() => {
    const fetchImageData = async () => {
      const imagesListRef = ref(storage, `${mailBoxID}/`);
      const ListResult = await listAll(imagesListRef);
      const Images = await Promise.all(
        ListResult.items.map(async (item) => {
          return await getDownloadURL(item);
        })
      );
      setImageUrls(Images);
    };
    fetchImageData();
  }, [mailBoxID]);

  return (
    <>
      <Wrapper>
        <VStack>
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
          <Button onClick={uploadFile}> 上傳</Button>
          {imageUrls.map((url, index) => {
            return <img key={index} src={url} />;
          })}
        </VStack>
      </Wrapper>
    </>
  );
}

export default SendImage;
