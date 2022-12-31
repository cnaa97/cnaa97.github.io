import React, { ReactNode } from 'react';

import Link from 'next/link';

import { AppConfig } from '../utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="antialiased w-full md:px-0 flex flex-col h-full min-h-screen">
    {props.meta}

    <header className="shadow-[0px_0px_10px_rgb(154_154_154/25%)]">
      <div className="px-4 flex max-w-screen-md mx-auto py-4 md:py-6 justify-end">
        <Link href="/">
          <a className="text-xl lg:text-2xl text-main font-thin hover:text-main/80 hover:font-light">
            {AppConfig.title}
          </a>
        </Link>
      </div>
    </header>

    <main className="text-gray-700 py-8">
      <div className="w-full max-w-screen-md mx-auto px-6 lg:px-4">
        {props.children}
      </div>
    </main>

    <footer className="mt-auto">
      <div className="mt-10 bg-main">
        <div className="max-w-screen-md mx-auto flex justify-end px-8">
          <div className="w-full aspect-square md:w-64 md:h-64 bg-[linear-gradient(0deg,#8D1B83_0%,#2900FF_100%)] shadow-[0_24px_65px_-20px_rgb(0_0_0/55%)] text-white trnasform -translate-y-8 md:-translate-y-10 flex flex-col p-5">
            <div className="font-bold text-xl flex flex-col gap-3">
              <Link href="/">
                <a className="text-white">홈</a>
              </Link>
              <Link href="/about/">
                <a className="text-white">소개</a>
              </Link>
              <a href={`mailto:${AppConfig.email}`} className="text-white">
                이메일
              </a>
            </div>
            <span className="mt-auto text-sm font-thin">
              © Copyright {new Date().getFullYear()} {AppConfig.title}
            </span>
          </div>
        </div>
      </div>
    </footer>
  </div>
);

export { Main };
