import { NextRequest, NextResponse } from 'next/server';

import CryptoJS from 'crypto-js';

const HOST = CryptoJS.AES.decrypt(
  'dqSxX2XSHb3sxHlWrsnO+iLo94Lw0FsPdwoctY/yvT3vFzE3KlorNZJHYbNhscu7cdounaTicY2IoUpH0clYHbuGGoBT9E9BvfxYAfo8uSE=',
  CryptoJS.enc.Hex.parse(process.env.AES_KEY),
  {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  },
).toString(CryptoJS.enc.Utf8);

export async function GET(request: NextRequest): Promise<NextResponse> {
  const response = await fetch(HOST + new URL(request.url).searchParams.get('id'), {
    cache: 'force-cache',
    next: { revalidate: 31536000 },
  });

  const contentType = response.headers.get('content-type') || 'image/jpeg';
  const imageData = await response.arrayBuffer();

  const imageResponse = new NextResponse(imageData);
  imageResponse.headers.set('Content-Type', contentType);
  imageResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

  return imageResponse;
}
