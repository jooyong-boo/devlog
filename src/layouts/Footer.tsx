import Link from 'next/link';
import GithubSvg from '@/assets/svg/github.svg';
import MailSvg from '@/assets/svg/mail.svg';

function Footer() {
  return (
    <div className="mt-4 flex flex-col gap-2 pb-4">
      <div className="flex justify-center gap-3">
        <Link
          href="https://github.com/jooyong-boo"
          target="_blank"
          className="hover:fill-sky-600 dark:fill-slate-50 dark:hover:fill-orange-600"
        >
          <GithubSvg width={24} height={24} />
        </Link>
        <Link
          href="mailto:qnwndyd159@naver.com"
          className="hover:fill-sky-600 dark:fill-slate-50 dark:hover:fill-orange-600"
        >
          <MailSvg />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2 text-xs">
        <p>JOOYONG BOO</p>
        <div> • </div>
        <p>@ 2024</p>
        <div> • </div>
        <p>JOOYONG.DEV TECH BLOG</p>
      </div>
    </div>
  );
}
export default Footer;
