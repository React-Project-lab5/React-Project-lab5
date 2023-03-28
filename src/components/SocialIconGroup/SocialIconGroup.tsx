import Blog from '../../../public/assets/blog.svg';
import classes from './SocialIconGroup.module.scss';
import Youtube from '../../../public/assets/youtube.svg';
import Facebook from '../../../public/assets/faceBook.svg';
import NaverPost from '../../../public/assets/naverPost.svg';
import Instargram from '../../../public/assets/instagram.svg';

export function SocialIconGroup() {
  return (
    <div className={classes['socialIconGroupWrapper']}>
      <img src={Blog} alt="" />
      <img src={Facebook} alt="" />
      <img src={Instargram} alt="" />
      <img src={NaverPost} alt="" />
      <img src={Youtube} alt="" />
    </div>
  );
}
