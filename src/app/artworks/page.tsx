import Link from 'next/link';

const images = [
  { src: '/demo/art1.jpg', title: '作品一', link: '/artworks/1' },
  { src: '/demo/art2.jpg', title: '作品二', link: '/artworks/2' },
  { src: '/demo/art3.jpg', title: '作品三', link: '/artworks/3' },
  // ...更多图片
];

const items = [
  { title: '项目A', desc: '这里是项目A的描述。' },
  { title: '项目B', desc: '这里是项目B的描述。' },
  // ...更多项目
];

export default function Artworks() {
  return (
    <div className="min-h-screen pt-24 px-4">
      {/* 横向图片滚动 */}
      <div className="overflow-x-auto whitespace-nowrap pb-6">
        {images.map(img => (
          <Link href={img.link} key={img.link} className="inline-block mx-2 align-top">
            <div className="w-72 h-44 bg-gray-200 rounded-lg shadow hover:scale-105 transition overflow-hidden">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-2 text-lg font-medium">{img.title}</div>
          </Link>
        ))}
      </div>
      {/* 详细内容列表 */}
      <div className="max-w-2xl mx-auto mt-10 space-y-8">
        {items.map((item, idx) => (
          <div key={idx} className="border-b pb-4">
            <div className="text-xl font-bold mb-2">{item.title}</div>
            <div className="text-gray-700">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}