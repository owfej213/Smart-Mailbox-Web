import { useEffect, useState } from "react";
import Wrapper from "../../components/ui/Wrapper";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Icon from "../../components/ui/Icon";
import { getDownloadURL, getMetadata, listAll, ref } from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { useUserData } from "../../components/Context/UserDataContext";
import { formateDateYMDHM } from "../../utils/dateUtils";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

function InsideBox() {
  const [loading, setLoading] = useState(true);
  const [imageExist, setImageExist] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageDateNumber, setImageDateNumber] = useState(Number);
  const { userData } = useUserData();
  const { mailBoxID } = userData || {};
  //取得所有圖片的Metadata
  useEffect(() => {
    const fetchImagesMetadata = async () => {
      try {
        const imagesListRef = ref(storage, `${mailBoxID}/`);
        const ListResult = await listAll(imagesListRef);
        const ImagesMetadata = await Promise.all(
          ListResult.items.map(async (item) => {
            const metadata = await getMetadata(item);
            var imageName = metadata.name;
            var imageDate = imageName.match(/\d+/g)[0];
            return {
              imageDate: imageDate,
              imageRef: item,
            };
          })
        );
        if (ImagesMetadata.length === 0) {
          setImageExist(false);
          setLoading(false);
          return;
        } else {
          setImageExist(true);
        }
        //將所有圖片時間排序，取得最新圖片的資料
        var lastestImageData = ImagesMetadata.sort(
          (a, b) => b.imageDate - a.imageDate
        )[0];
        //得到最新圖片的Url
        const ImageUrl = await getDownloadURL(lastestImageData.imageRef);
        setImageDateNumber(lastestImageData.imageDate);
        setImageUrl(ImageUrl);
        setLoading(false);
      } catch (error) {
        console.error();
      }
    };
    fetchImagesMetadata();
  }, [mailBoxID]);

  return (
    <>
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Wrapper>
          {!loading && (
            <VStack>
              {imageExist ? (
                <>
                  <Text my="4" color="white" fontWeight="600" fontSize="xl">
                    上次更新時間：
                    {imageDateNumber !== 0 && formateDateYMDHM(imageDateNumber)}
                  </Text>
                  <Image src={imageUrl} w="1000px" />
                </>
              ) : (
                <>
                  <Text my="4" color="white" fontWeight="600" fontSize="xl">
                    尚未有任何照片
                  </Text>
                  <Flex
                    bg="gray.300"
                    w="900px"
                    h="600px"
                    align="center"
                    justify="center"
                  >
                    <Icon name="Mail" color="#3182CE" size={160} />
                  </Flex>
                </>
              )}
            </VStack>
          )}
        </Wrapper>
      </MotionBox>
    </>
  );
}

export default InsideBox;
