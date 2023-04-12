import chatData from '@/data/chatData.json';
import classes from './Chattings.module.scss';

export const Chattings = () => {
  return (
    <section className={classes.chats}>
      {chatData.map((item) => (
        <div
          key={item.id}
          role={'region'}
          className={classes.userChat}
          tabIndex={0}
        >
          <img src={item.image} alt=" " />
          <div className={classes.userChatInfo}>
            <span>{item.name}</span>
            <p>
              {item.address} {item.message}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};
