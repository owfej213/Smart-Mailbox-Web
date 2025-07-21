import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getDownloadURL, getMetadata, listAll, ref } from 'firebase/storage';
import { storage } from '../../../utils/firebase/firebase';
import Icon from '../../../components/ui/Icon';
import { formateDateYMDHM } from '../../../utils/dateUtils';
import { useUserDataContext } from '../../../hooks/context/useUserDataContext';

export default function InsideBox() {
  const [loading, setLoading] = useState(true);
  const [imageExist, setImageExist] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageDateNumber, setImageDateNumber] = useState(Number);
  const { userData } = useUserDataContext();
  const { mailBoxID } = userData || {};
  //TODO: 改成 Cloud Functions 取得最新圖片的Url
  useEffect(() => {
    const fetchImagesMetadata = async () => {
      try {
        const imagesListRef = ref(storage, `${mailBoxID}/`);
        const ListResult = await listAll(imagesListRef);
        //取得所有圖片的Metadata
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
        //取得最新圖片的資料
        var lastestImageData = ImagesMetadata.reduce((min, item) =>
          item.imageDate > min.imageDate ? item : min
        );
        //得到最新圖片的Url
        const ImageUrl = await getDownloadURL(lastestImageData.imageRef);
        setImageDateNumber(lastestImageData.imageDate);
        setImageUrl(ImageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images metadata:', error);
        setLoading(false);
        setImageExist(false);
      }
    };
    fetchImagesMetadata();
  }, [mailBoxID]);

  return (
    <Box animation="fade-in 0.5s">
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
    </Box>
  );
}
