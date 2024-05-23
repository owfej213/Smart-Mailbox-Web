import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import MainTitle from "../../components/ui/MainTitle";
import Wrapper from "../../components/ui/Wrapper";
import Container from "../../components/ui/Container";
import SubTitle from "../../components/ui/SubTitle";
import { useUserData } from "../../components/Context/UserDataContext";

function Detail() {
  const { id } = useParams();
  const { userData } = useUserData();
  const { mailBoxID } = userData || {};

  const [maildata, setMaildata] = useState({});
  const {
    date,
    title,
    type,
    receiver,
    sender,
    senderAddress,
    senderCompany,
    urgency,
    keyContent,
  } = maildata || {};

  useEffect(() => {
    const fetchMailData = async () => {
      if (mailBoxID !== null) {
        try {
          //提取集合
          const MailDoc = doc(
            collection(db, `mailBoxes/${mailBoxID}/mails`),
            id
          );

          const result = await getDoc(MailDoc);

          setMaildata(result.data());
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchMailData();
  }, [id, mailBoxID]);

  return (
    <>
      <MainTitle>郵件細節</MainTitle>
      <Wrapper>
        <Container w="500px">
          <SubTitle size="2xl">基本資訊</SubTitle>
          <span>送達日期：{date}</span>
          <span>信件主題：{title}</span>
          <span>類型：{type}</span>
          <span>收信人：{receiver}</span>
        </Container>
        <Container w="500px">
          <SubTitle size="2xl">進階資訊</SubTitle>
          <span>寄送人：{sender}</span>
          <span>寄送單位：{senderCompany}</span>
          <span>寄送單位地址：{senderAddress}</span>
          <span>緊急性：{urgency}</span>
          <span>關鍵內容：{keyContent}</span>
        </Container>
      </Wrapper>
    </>
  );
}

export default Detail;
