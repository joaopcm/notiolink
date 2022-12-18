import { GetServerSideProps } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import * as React from 'react';

import axiosClient from '@/lib/axios';
import { getUrlBySlug } from '@/lib/notion';

export default function Slug() {
  return <div>Redirecting...</div>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as NextParsedUrlQuery;
  const url = await getUrlBySlug(String(slug));

  if (url.link) {
    try {
      await axiosClient.post(
        'https://quicklinks.jopcmelo.dev/api/increment',
        url
      );
    } catch (error) {
      console.error('/api/increment', error);
    }
  }

  return {
    props: {},
    redirect: {
      destination: url.link ? url.link : `/new?slug=${slug}`,
      permanent: false,
    },
  };
};
