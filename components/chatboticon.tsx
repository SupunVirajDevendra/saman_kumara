import Image from "next/image";
import avatar from "../app/img/image.png";

export default function Chatboticon() {
  return (
    <div className="avatar-container animate-bounce transition-all duration-300">
      <Image
        src={avatar}
        alt="Chatbot Avatar"
        width={48}
        height={48}
        className="avatar-image rounded-full shadow-md"
      />
    </div>
  );
}
