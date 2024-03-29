import Blog from '../../../public/assets/blog.svg';
import classes from './SocialIconGroup.module.scss';
import Youtube from '../../../public/assets/youtube.svg';
import Facebook from '../../../public/assets/faceBook.svg';
import NaverPost from '../../../public/assets/naverPost.svg';
import Instargram from '../../../public/assets/instagram.svg';

export function SocialIconGroup() {
  return (
    <div className={classes['socialIconGroupWrapper']}>
      <img src={Blog} alt="네이버 블로그" width={30} height={30} />
      <img src={Facebook} alt="페이스북" width={30} height={30} />
      <img src={Instargram} alt="인스타그램" width={30} height={30} />
      <img src={NaverPost} alt="네이버 포스트" width={30} height={30} />
      <img src={Youtube} alt="유튜브" width={30} height={30} />
    </div>
  );
}
