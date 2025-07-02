/*

"use client"
import React from 'react'
import Image from 'next/image'

export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      {// фоновая текстура шума по всему }
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/decorative/noise.png")',
          opacity: 0.04,
        }}
      />

      {// горизонтальный градиент-переход}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient( to bottom, #0A1329, transparent )',
        }}
      />

      {// элипс в левом низу}
      <Image
        src="/decorative/ellipse5.png"
        alt=""
        width={300}
        height={300}
        className="absolute bottom-0 left-0 opacity-30"
      />
      {// элипс в правом низу}
      <Image
        src="/decorative/ellipse6.png"
        alt=""
        width={300}
        height={300}
        className="absolute bottom-0 right-0 opacity-30"
      />

      {children}

      {// элипс за кнопками TON }
      <Image
        src="/decorative/ellipse10.png"
        alt=""
        width={200}
        height={200}
        className="absolute top-10 right-1/4 opacity-20"
      />
    </div>
  )
}
*/