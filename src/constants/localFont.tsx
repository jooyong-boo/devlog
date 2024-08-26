import localFont from 'next/font/local';

export const Pretendard = localFont({
  src: [
    {
      path: '../assets/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Pretendard-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
