import classes from './SendMessage.module.scss';
import Img from '/public/assets/chatImagePlaceholder.svg';
import { BsFillSendFill } from 'react-icons/bs';
export const SendMessage = () => {
  return (
    <form className={classes.input}>
      <div>
        <label htmlFor="message" className="a11yHidden">
          메세지 입력
        </label>
        <input
          type="text"
          placeholder="메시지를 입력하세요."
          name="text"
          id="message"
        />
      </div>
      <div className={classes.send}>
        <input type="file" style={{ display: 'none' }} id="file" name="file" />
        <label htmlFor="file">
          <img src={Img} alt="이미지 업로드" />
        </label>

        <button>
          <BsFillSendFill />
        </button>
      </div>
    </form>
  );
};
