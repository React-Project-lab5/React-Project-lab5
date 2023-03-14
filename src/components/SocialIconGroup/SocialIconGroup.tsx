import classes  from './SocialIconGroup.module.scss';
import Blog from '../../../public/assets/blog.svg';
import Facebook from '../../../public/assets/faceBook.svg';
import Instargram from '../../../public/assets/instagram.svg';
import NaverPost from '../../../public/assets/naverPost.svg';
import Youtube from '../../../public/assets/youtube.svg';


export function SocialIconGroup() {
  return (
    <div className={classes['socialIconGroup-Wrapper']}>
      <img src={Blog} alt="" />
      <img src={Facebook} alt="" />
      <img src={Instargram} alt="" />
      <img src={NaverPost} alt="" />
      <img src={Youtube} alt="" />
    </div>
  )
}