import Image from 'next/image';

const BlogFeaturedSection = () => {
  const posts = [
    {
      label: 'Trending',
      title: 'Blog Post',
      description1: 'Our mission is to make discovering premium products and reliable services simple and enjoyable. From local boutiques to specialized service providers, we bring everything you need into one seamless platform.',
      description2: 'To create a marketplace and directory that empowers both customers and businesses, making every experience smooth, transparent, and delightful.',
      // image: '/service-img/Rectangle 4455.png',
      image: '/blog-img/Rectangle 4455.svg',
      isReversed: false,
    },
    {
      label: 'Trending',
      title: 'Blog Post',
      description1: 'Our mission is to make discovering premium products and reliable services simple and enjoyable. From local boutiques to specialized service providers, we bring everything you need into one seamless platform.',
      description2: 'To create a marketplace and directory that empowers both customers and businesses, making every experience smooth, transparent, and delightful.',
      // image: '/service-img/Rectangle 4457.png',
      image: '/blog-img/Rectangle 4457.svg',
      isReversed: true,
     
    }
  ];

  return (
    <section className="w-full bg-brand-greige py-24 md:py-[118px] px-6 md:px-12 lg:px-24">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-15 md:gap-24">
        
        {posts.map((post, index) => (
          <div 
            key={index} 
            className={`flex flex-col md:items-center gap-12 lg:gap-20 ${
              post.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            {/* Image Container */}
            <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px]">
              
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                draggable={false}
                priority
              />
            </div>

            {/* Content Container */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
              <span className="text-[16px] font-playfair font-bold text-brand-text mb-3">
                {post.label}
              </span>
              <h2 className="text-4xl md:text-[36px] font-bold font-playfair text-brand-text mb-8">
                {post.title}
              </h2>
              
              <div className="space-y-6 text-brand-text leading-relaxed font-regular text-[15px] md:text-[20px] font-playfair max-w-lg mb-10">
                <p>{post.description1}</p>
                <p>{post.description2}</p>
              </div>

              <button className="bg-[#F1E1C2] font-playfair text-brand-text px-8 py-3 text-[20px] font-bold hover:bg-[#e5d8c1] transition-all shadow-sm">
                Read More
              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default BlogFeaturedSection;